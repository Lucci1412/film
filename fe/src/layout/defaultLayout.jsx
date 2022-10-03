import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationTop from "../components/NavigationTop";
import "./style.scss";
function DefaultLayout({ children }) {
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="defaultLayout">
      <div className="progress">
          <div
            style={{ width: `${scrollTop}%` }}
            className="progress-bar"
          ></div>
        </div>
      <div className="top-fix">
        <Header></Header>
        <NavigationTop></NavigationTop>
      </div>

      <div className="defaultLayout_children">
        <div className="container">{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;
