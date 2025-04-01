import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/');

        if (!response) {
          console.log('Error');
        }
        setData(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = axios.delete(`http://localhost:8001/delete/${id}`);

      if (!response) {
        console.log('Error');
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>Student List</h2>
        <div className='d-flex justify-content-end'>
          <Link to='/create' className='btn btn-success'>
            Create +
          </Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ ID, Name, Email }) => (
              <tr key={ID}>
                <td>{ID}</td>
                <td>{Name}</td>
                <td>{Email}</td>
                <td>
                  <Link to={`/read/${ID}`} className='btn btn-sm btn-info'>
                    Read
                  </Link>
                  <Link to={`/edit/${ID}`} className='btn btn-primary'>
                    edit
                  </Link>
                  <button
                    onClick={() => handleDelete(ID)}
                    className='btn btn-sm btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
