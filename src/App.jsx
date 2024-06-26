import './App.css';

import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Aboutus from './pages/Aboutus';
import Home from './pages/Home';
import Notfound from './pages/Notfound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  

  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<Aboutus/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='*' element={<Notfound/>}/>



    </Routes>
    </>
  )
}

export default App
