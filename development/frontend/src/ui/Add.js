import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const Add = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Title is required')
      .max(10, 'Title cannot be longer than 10 characters')
      .min(4, 'Title should be longer than 4 characters'),
    content: yup
      .string()
      .required('Content is required')
      .max(50, 'Content cannot be longer than 50 characters')
      .min(5, 'Content should be longer than 5 characters'),
    image: yup.string().url('Image should be url'),
  });

  return (
    <div>
      <h3>Add new todo</h3>
      <div
        style={{
          textAlign: 'left',
        }}
      >
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            axios.post('/api/todo', values).then(() => {
              navigate(-1);
            });
          }}
          initialValues={{
            name: '',
            content: '',
            image: '',
          }}
        >
          <Form>
            <ErrorMessage id='error' name='name' component='div' />
            <p>
              Title: <Field name='name' />
            </p>
            <ErrorMessage id='error' name='content' component='div' />
            <p>
              Content: <Field name='content' />
            </p>
            <ErrorMessage id='error' name='image' component='div' />
            <p>
              Image: <Field name='image' />
            </p>
            <button style={{ marginTop: '40px' }} type='submit'>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <button onClick={() => navigate(-1)}>undo</button>
    </div>
  );
};

export default Add;
