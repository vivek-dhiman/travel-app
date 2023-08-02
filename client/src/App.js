// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/login" element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
