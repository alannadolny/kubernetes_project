import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [toDo, setToDo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/todo').then((response) => {
      setToDo(response.data);
    });
  }, []);

  const deleteToDo = (title) => {
    axios.delete(`/api/todo/${title}`).then((data) => {
      setToDo((prev) => prev.filter((el) => el.name !== data.data.title));
    });
  };

  return (
    <div>
      <button onClick={() => navigate('/add')}>add new todo</button>
      <h3>Todo list:</h3>
      <div id='main'>
        {toDo.map((el) => {
          return (
            <div
              key={el.name}
              style={{
                border: '5px dotted white',
                margin: '5px',
                padding: '40px',
              }}
            >
              {el.image ? (
                <img src={el.image} alt='todo' style={{ height: '100px' }} />
              ) : (
                <img
                  src='https://play-lh.googleusercontent.com/N_sOqHTRwnodAWR4dsP8-2hS--LyQMFR9aiuB3Rkl_MElL8533zW30-y3MdJi4Svpjsx'
                  alt='todo'
                  style={{ height: '100px' }}
                />
              )}
              <p>Title: {el.name}</p>
              <p>Start date: {el.startDate.split('T')[0]}</p>
              <p>Done: {el.done.toString()}</p>
              {el.done && <p>Finish date: {el.endDate.split('T')[0]}</p>}
              <button onClick={() => navigate(`/${el.name}`)}>details</button>
              <button onClick={() => navigate(`/edit/${el.name}`)}>edit</button>
              <button onClick={() => deleteToDo(el.name)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
