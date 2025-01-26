import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./components/SignUp"; 
import SignIn from "./components/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/SignUp" element={<SignUp />} /> 
        <Route path="/SignIn" element={<SignIn />} /> 
      </Routes>
    </Router>
  );
}

export default App;

