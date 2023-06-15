import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//Pages
import CardInfo from './Pages/CardInfo/CardInfo';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<CardInfo/>} />;
          {/* <Route exact path='/PaymentConfirmation' element={<PaymentConfirmation/>} />; */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
