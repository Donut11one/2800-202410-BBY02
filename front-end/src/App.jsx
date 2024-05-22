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
import Wallet from "./components/pages/Wallet";
import NotFoundPage from "./components/pages/NotFoundPage";
import Docs from "./components/pages/Docs";
import useWallet from "./hooks/useWallet";
import HelpPage from "./components/pages/HelpPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { walletAddress } = useWallet()

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
          <Route path="/help" element={<HelpPage user={user} />} />
          <Route path="/Profile" element={<Profile userid={user}></Profile>} />
          <Route path='*' element={<NotFoundPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home></Home>
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet/:address"
            element={
              <ProtectedRoute user={user}>
                <Wallet></Wallet>
              </ProtectedRoute>
            }
          />
          <Route path="/docgalery" element={<ProtectedRoute user={user}><Docs wallet={walletAddress} /></ProtectedRoute>}>

          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
