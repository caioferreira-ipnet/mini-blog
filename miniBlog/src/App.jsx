import "./App.css";
//Reeact Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//Pages
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Search from "./pages/Search/Search.jsx";
//Components
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
//Firebase
import { onAuthStateChanged } from "firebase/auth";
//Context
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
//Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication.jsx";
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
    return <p className="loading">Carregando...</p>;
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
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/post/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              ></Route>
              <Route path="/search" element={<Search />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
