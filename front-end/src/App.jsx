import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./fbconfig";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./components/pages/Landing";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home";

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing user={user}></Landing>} />
          <Route path="/signin" element={<Signin user={user}></Signin>} />
          <Route path="/signup" element={<Signup user={user}></Signup>} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home></Home>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
