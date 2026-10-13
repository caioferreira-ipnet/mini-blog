import "./App.css";
//Reeact Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
//Components
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
