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
//Firebase
import { onAuthStateChanged } from "firebase/auth";
//Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication.jsx";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  if (loadingUser) {
    return <p>Carregando</p>;
  }
  return (
    <div className="App">
      <AuthContextProvider value={{ user }}>
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
      </AuthContextProvider>
    </div>
  );
}

export default App;
