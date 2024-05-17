import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./fbconfig";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./components/pages/Landing";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/pages/Home";
import PasswordReset from "./components/PasswordReset";
import NotFoundPage from "./components/pages/NotFoundPage";

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
          <Route path="/Login" element={<Login user={user}></Login>} />
          <Route path="/SignUp" element={<SignUp user={user}></SignUp>} />
          <Route path="/reset" element={<PasswordReset></PasswordReset>} />
          <Route path='*' element={<NotFoundPage />} />
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
