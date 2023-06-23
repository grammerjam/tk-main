import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//Pages
import CardInfo from './Pages/CardInfo/CardInfo';
import Dashboard from './Pages/CardDashboard/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<CardInfo/>} />;
          <Route exact path='/savedCards' element={<Dashboard/>} />;
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
