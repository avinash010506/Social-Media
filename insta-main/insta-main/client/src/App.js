import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/:username" element={<UserProfile />}></Route>
      </Routes>
    </>
  );
}

export default App;
