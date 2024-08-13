import noteContext from '../context/notes/NoteContext';
import React, { useContext } from 'react';

import { BrowserRouter as Router, Route, Routes, Link, useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';


const Home = () => {

  const context = useContext(noteContext);
  const { notes, addnote } = context;
  let location = useLocation();

  return (

    <div className="" style={{backgroundColor : '#7FA1C3'}}>
      <Navbar/>
      <div className="d-flex justify-content-around py-2" style={{backgroundColor : '#7FA1C3'}}>
        <Link className={`nav-link ${(location.pathname === "/viewnotes") ? "acitve" : ""}`} aria-current="page" to="/home"><span className='fs-3'>All</span></Link>
        <Link className={`nav-link ${(location.pathname === "/addNote") ? "acitve" : ""}`} aria-current="page" to="/home/AddNote"><span className='fs-3'>Add</span></Link>
      </div>
      <Outlet/>


    </div>
  )
}

export default Home
