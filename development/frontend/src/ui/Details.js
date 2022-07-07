import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Details = () => {
  const [todo, setTodo] = useState(null);
  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/todo/${title}`).then((response) => {
      setTodo(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Details {title}:</h3>
      {todo && (
        <div
          style={{
            textAlign: 'left',
            border: '5px dotted white',
            padding: '40px',
          }}
        >
          <p style={{ borderBottom: '1px solid white' }}>
            Content: {todo.content}
          </p>
          <p style={{ borderBottom: '1px solid white' }}>
            Done: {todo.done.toString()}
          </p>
        </div>
      )}
      <button style={{ marginTop: '50px' }} onClick={() => navigate(-1)}>
        undo
      </button>
    </div>
  );
};

export default Details;
