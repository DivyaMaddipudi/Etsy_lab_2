import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
import ProfileDashboard from "./profileDashboard";
import { Navigate } from "react-router-dom";

function profilePage() {
  const user = useSelector(selectUser);
  let redirectVar = null;

  if (!user) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }

  return (
    <div>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <ProfileDashboard />
    </div>
  );
}

export default profilePage;
