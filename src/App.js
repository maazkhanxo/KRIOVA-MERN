import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import React from "react";
import Signin from './components/Signin';
import ForgetPassword from './components/ForgetPassword';

function App() {
  return (
    <>
     <Router>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Home/>}>
      </Route>
    <Route exact path='/login' element={<Login/>}>
      </Route>  
    <Route exact path='/signin' element={<Signin/>}>
      </Route>  
    <Route exact path='/forgetPass' element={<ForgetPassword/>}>
      </Route>  
    </Routes>
    </Router>
    </>
  );
}

export default App;
