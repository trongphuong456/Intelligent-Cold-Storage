
import React from "react";
import Login from "./components/Login1/Login";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from "./components/Dashboard/Dashboard";
function App() {

  return ( 
    <BrowserRouter>
        <Routes>
            <Route path='/' element ={<Login/>}/>
            <Route path='/home' element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>   
  );
}

export default App;
