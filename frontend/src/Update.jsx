import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();

  //   const [student, setStudent] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/read/' + id);

        if (!response) {
          console.log('Error');
        }

        setFormData({
          ...formData,
          name: response?.data?.result[0]?.Name,
          email: response?.data?.result[0]?.Email,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();
  const { name, email } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8001/update/${id}`,
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
          <h2>Edit Student</h2>
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

export default Update;
