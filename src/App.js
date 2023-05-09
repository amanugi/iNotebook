import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    <div className="container">
      <Routes>
        <Route element={<Home/>} exact path='/' />
        <Route element={<About/>} exact path='/about' />
      </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
