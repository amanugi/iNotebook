import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';


function App() {

  const[alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout( () => {
      setAlert(null);
    }, 1500)
  };


  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    <Alert alert={alert} />
    <div className="container">
      <Routes>
        <Route element={<Home showAlert={showAlert} />} exact path='/' />
        <Route element={<About />} exact path='/about' />
        <Route element={<Login showAlert={showAlert} />} exact path='/login' />
        <Route element={<Signup showAlert={showAlert} />} exact path='/signup' />
      </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
