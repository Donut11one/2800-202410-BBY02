import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../fbconfig";

const Home = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Home Page!!!</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Home;
