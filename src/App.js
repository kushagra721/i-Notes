
import './App.css';

import  Home  from './components/Home';
import  Navbar  from './components/Navbar';


import Signup from './components/Signup';
import Login from './components/Login';
import Graph from './components/Graph.js';





import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    
      <>
    <Router>
    <Navbar/>
    

    <div className="container">
      <Home/>
    
     
  
      
      <Routes>
      
    
   
      <Route exact path="/Home" element={<Home/>}></Route>
     
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/graph" element={<Graph/>}></Route>
      <Route exact path="/signup" element={<Signup/>}></Route>
    </Routes>
    </div>
    </Router>
    </>
    
    
   
  );
}

export default App;
