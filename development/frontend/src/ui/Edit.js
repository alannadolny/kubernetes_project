import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { title } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/todo/${title}`).then((response) => {
      setTodo(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Edit {title}:</h3>
      {todo && (
        <div style={{ textAlign: 'left' }}>
          <Formik
            onSubmit={(values) => {
              axios.put(`/api/todo`, { name: title, ...values }).then(() => {
                navigate(-1);
              });
            }}
            initialValues={{
              content: todo.content,
              done: todo.done,
              image: '',
            }}
          >
            <Form>
              content: <Field name='content' /> <br />
              done: <Field name='done' type='checkbox' /> <br />
              image: <Field name='image' /> <br />
              <button style={{ marginTop: '40px' }} type='submit'>
                edit
              </button>
            </Form>
          </Formik>
        </div>
      )}
      <button onClick={() => navigate(-1)}>undo</button>
    </div>
  );
};

export default Edit;
