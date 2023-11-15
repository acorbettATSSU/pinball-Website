import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import AddScore from "./components/pages/addScorePage";
import ViewMScore from "./components/pages/viewMachineScore";
import AddIssue from "./components/pages/addIssuePage";
import ViewIssue from "./components/pages/viewIssuesPage";
import AddMachine from "./components/pages/Admin/addMachinePage" 
import AdminMain from "./components/pages/Admin/adminMain"
import AdminScores from "./components/pages/Admin/adminScore"
import AdminIssue from "./components/pages/Admin/adminIssue"
import Torny from "./components/pages/torny/tornament"

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/addIssue" element={<AddIssue />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route exact path="/score" element={<AddScore />} />
          <Route exact path="/mScore" element={<ViewMScore />} />
          <Route exact path="/viewIssue" element={<ViewIssue />} />
          <Route exact path="/admin/main" element={<AdminMain />} />
          <Route exact path="/admin/score" element={<AdminScores/>} />
          <Route exact path="/admin/issue" element={<AdminIssue/>} />
          <Route exact path="/AMTest" element={<AddMachine />} />
          <Route exact path="/torn" element={<Torny />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
