import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile";
import PostList from "./components/Post/PostList";
import GroupList from "./components/Group/GroupList";
import GroupCreate from "./components/Group/GroupCreate";
import GroupPage from "./components/Group/GroupPage";
import ListConversation from "./components/Conversation/ListConversation";

import ProfileComponent from "./components/Profile/ProfileComponent";

import Event from "./utils/Event";
import PrivateRoute from "./utils/PrivateRoute";
import Search from "./components/Search/Search";
import RequesterList from "./components/Friend/RequesterList";
import Navbar from "./Navbar";
function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  const user = AuthService.getCurrentUser();

  useEffect(() => {

    if (user) {
      setCurrentUser(user);
    }

    Event.on("logout", () => {
      logOut();
    });

    return () => {
      Event.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <>
    { currentUser &&  <Navbar user={user} currentUser={currentUser} logOut={logOut}/>}
  <div className="theme-layout">

    <Routes>
      {/* Cần thêm feature khi jwt expired thì redirect user về /login */}
      {!currentUser
      ?<Route path="/" element={<Login/>} />
      :<Route path="/" element={<PostList/>} />}
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
      {/* Thêm privateroute vào các route cần auth mới truy cập được */}
      <Route path="/posts" element={
        <PrivateRoute>
          <PostList />
        </PrivateRoute>
      } />
      <Route path="/groups" element={
        <PrivateRoute>
          <GroupList />
        </PrivateRoute>
      } />
      <Route path="/group/create" element={
        <PrivateRoute>
          <GroupCreate />
        </PrivateRoute>
      } />
      <Route path="/group/:id" element={
        <PrivateRoute>
          <GroupPage />
        </PrivateRoute>
      } />


    <Route path="/profile/:userID" element={
        <PrivateRoute>
          <ProfileComponent />
        </PrivateRoute>
      } />
      <Route path="/conversation/:userID" element={
        <PrivateRoute>
        <ListConversation />
        </PrivateRoute>
      } />
    <Route path="/search/:keyword" element={
        <PrivateRoute>
          <Search />
        </PrivateRoute>
      } />

    <Route path="/list-requester/:userID" element={
        <PrivateRoute>
          <RequesterList />
        </PrivateRoute>
      }/>
    </Routes>

      
</div>
    
    </>
  

  );
}
export default App;