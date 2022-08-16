import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/HomePage";
import Authentication from "./containers/Login/Authentication";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/" exact element={<Authentication />} />
      </Routes>
    </Router>
  );
};

export default App;
