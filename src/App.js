
import './App.css';
import {Routes,Route} from "react-router-dom"
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/Signup';
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
   
      <div className='main-body'>

        <Routes>
        <Route path="/" element={<PrivateRoute><Login/></PrivateRoute>}></Route>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
        </Routes>
      </div>          

    </div>
  );
}

export default App;
