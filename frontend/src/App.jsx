import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Read from './Read';
import Update from './Update';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/read/:id' element={<Read />} />
        <Route path='/edit/:id' element={<Update />} />
      </Routes>
    </Router>
  );
};

export default App;
