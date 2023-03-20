
import './App.css';
import  About  from './components/About';
import { Home } from './components/Home';
import  Navbar  from './components/Navbar';
import NoteState from '../src/context/NoteState';
import {Alert} from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';




import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <div>
      <NoteState>
    <Router>
    <Navbar/>
    <Alert message = "i - Notes - online notebook app"/>
    <div className="container">
  
      
      <Routes>
    
   
      <Route exact path="/Home" element={<Home/>}></Route>
      <Route exact path="/About" element={<About/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/signup" element={<Signup/>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </div>
   
  );
}

export default App;
