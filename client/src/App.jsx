import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App;
