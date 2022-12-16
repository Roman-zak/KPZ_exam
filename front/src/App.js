import logo from './logo.svg';
import './App.css';
import ClinicNavbar from './сomponents/ClinicNavbar.js';
//import CarEdit       from './сomponents/CarEdit.js';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import Home from "./pages/Home";
//import Cars from "./pages/Cars";
// import Reservations from "../pages/Reservations";
// import NoPage from "../pages/NoPage";

function App() {
  return (
    <div className="App">

      <ClinicNavbar/>
      <header className="App-header">
   
      </header>
    </div>
  );
}

export default App;
