const express = require('express');
const router = express.Router({ mergeParams: true });
const ToDo = require('./schema');
const client = require('./client');

router.post('/', async (req, res) => {
  try {
    const toAdd = {
      content: req.body.content,
      name: req.body.name,
      done: false,
      startDate: new Date(),
      image: req.body.image,
    };
    const newToDo = await ToDo(toAdd).save();
    await client.set(toAdd.name, JSON.stringify(toAdd));
    return res.send(newToDo);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const todos = await ToDo.find({});
    for (const todo of todos) {
      await client.set(todo.name, JSON.stringify(todo));
    }
    return res.send(todos);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:title', async (req, res) => {
  try {
    const fromRedis = await client.get(req.params.title);
    if (fromRedis === null) {
      const fromMongo = await ToDo.findOne({ name: req.params.title });
      await client.set(req.params.title, fromMongo);
      return res.send(fromMongo);
    }
    return res.send(JSON.parse(fromRedis));
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const editedToDo = {
      name: req.body.name,
      content: req.body.content,
      done: req.body.done,
      startDate: req.body.startDate,
      endDate: new Date(),
      image: req.body.image,
    };
    await ToDo.updateOne({ name: req.body.name }, editedToDo);
    await client.set(req.body.name, JSON.stringify(editedToDo));
    return res.send(req.body);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/:title', async (req, res) => {
  try {
    await ToDo.deleteOne({ name: req.params.title });
    await client.del(req.params.title);
    return res.send({ title: req.params.title });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
