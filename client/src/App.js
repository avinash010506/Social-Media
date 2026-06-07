import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import Homepage from "./components/Homepage";
import Messages from "./components/Messages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/user/:username" element={<UserProfile />}></Route>
      </Routes>
    </>
  );
}

export default App;
