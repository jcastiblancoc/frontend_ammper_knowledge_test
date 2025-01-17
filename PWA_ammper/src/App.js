import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Accounts from "./pages/Accounts";

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accounts" element={<Accounts />} />
        </Routes>
        </Router>
    );
}

export default App;
