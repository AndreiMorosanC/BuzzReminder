
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/LoginMain/Login'
import './App.css'
import Home from "./Pages/HomeMain/Home";
import SignUp from "./Pages/SignUpMain/SignUp";
import SessionControl from "./Components/SessionControl";

function App() {
  

  return (
    <div>
      <SessionControl/>
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<SignUp/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
