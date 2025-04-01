import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Read = () => {
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/read/' + id);

        if (!response) {
          console.log('Error');
        }
        setStudent(response.data.result[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>Student Detail</h2>

        <div className='p-2'>
          <h2>{student?.ID}</h2>
          <h2>{student?.Name}</h2>
          <h2>{student?.Email}</h2>
        </div>

        <Link to='/' className='btn btn-primary me-2'>
          Back
        </Link>
        <Link to={`/edit/${student?.ID}`} className='btn btn-primary'>
          edit
        </Link>
      </div>
    </div>
  );
};

export default Read;
