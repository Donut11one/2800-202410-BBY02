import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/pages/Landing";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
