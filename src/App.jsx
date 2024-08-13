import React, { Profiler, useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home';
import Profile from './components/profile';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import ViewNotes from './components/ViewNotes';
import AddNote from './components/AddNote';
import Signup from './components/Signup';

function App() {
  const [mode, setMode] = useState('light');
  const [loggedin, setlogin] = useState(false)
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.style.backgroundColor = (mode === 'dark' ? '#6482AD' : '#7FA1C3');
  }
  const theme = {
    backgroundColor: mode === 'light' ? '#6482AD' : '#6482AD',
    color: mode === 'light' ? '#6482AD' : '#fff',
    transition: 'background-color 0.3s, color 0.3s',

  }
  // let navigate = useNavigate();
  // useEffect(() => {
  //   var token = localStorage.getItem('token')
  //   if (token && token.length > 1) {
  //     setlogin(true);
  //   } else {
  //     setlogin(false),
  //     navigate("/")
  //   }
  // }, [navigate])

  
  return (
    <>
      <NoteState>
        <Router>
          {/* {loggedin && <Navbar mode={mode} toggleMode={toggleMode} />} */}

          <div className='mx-3 my-3 border rounded py-1 px-0' style={{backgroundColor : '#7FA1C3'}}   >

            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              
              <Route path="/home" element={<Home />} >
                <Route path="/home/" element={<ViewNotes />} />
                <Route path="/home/AddNote" element={<AddNote />} />
              </ Route>
              <Route path="/profile" element={<Profile />} />

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App
