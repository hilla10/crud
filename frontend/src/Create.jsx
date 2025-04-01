import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();
  const { name, email } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8001/student',
        formData
      );

      if (!response) {
        console.log('Error');
      }

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter Your Name'
              className='form-control'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter Your Email'
              className='form-control'
              value={email}
              onChange={handleChange}
            />
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
