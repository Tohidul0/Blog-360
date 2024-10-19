import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashProfile from "../components/Dashboard/DashProfile";
import PrivateRoute from "./../components/PrivateRoute";
import Allposts from "../components/Allposts";
import Alluser from "../components/Alluser";
import Allcomment from "../components/Allcomment";
import MainDash from "../components/Dashboard/MainDash";

function Dashborad(props) {
  const location = useLocation();
  //console.log(location)
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const urltabs = urlPrams.get("tab");
    //console.log(urltabs)
    setTab(urltabs);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full ">
      {/* left sidebar */}
      <div className="h-full ">
        <DashSidebar></DashSidebar>
      </div>

      {/* right side profile */}

      <div className=" w-full pl-2">
        {tab === "profile" && <DashProfile></DashProfile>}
        {tab === "posts" && <Allposts></Allposts>}
        {tab === "users" && <Alluser></Alluser>}
        {tab === "comment" && <Allcomment></Allcomment>}
        {tab === "dash" && <MainDash></MainDash>}
      </div>
    </div>
  );
}

export default Dashborad;
