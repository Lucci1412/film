import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationTop from "../components/NavigationTop";
import SideBar from "../components/Sidebar";
import "./style.scss";
function UserLayout({ children }) {
  return (
    <div className="user-layout">
      <div className="top-fix">
        <Header></Header>
        <NavigationTop></NavigationTop>
      </div>
      <div className="container">
        <div className="main ">
          <SideBar />
          <div className="children">{children}</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default UserLayout;
