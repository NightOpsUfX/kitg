import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "./variables.scss"

// import {Footer} from "./components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
// import {LoginPage} from "./pages/LoginPage/LoginPage";
import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {ConverterPage} from "./pages/ConverterPage/ConverterPage";
import {CurrenciesPage} from "./pages/CurrenciesPage/CurrenciesPage";
// import {ResetPasswordPage} from "./pages/ResetPasswordPage/ResetPasswordPage";

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/converterPage")
  },[])

  return (
    <div className="App">
      {/*<Header/>*/}
      <div className={`main`}>
        <Routes>
          <Route path="/converterPage" element={<ConverterPage/>} />
          <Route path="/currenciesPage" element={<CurrenciesPage/>} />
        </Routes>
      </div>
      {/*<Footer/>*/}

    </div>
  );
}

export default App;
