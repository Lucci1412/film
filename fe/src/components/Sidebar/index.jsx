import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/userSlice";
import { setAuth } from "../../redux/userSlice";
import { messageInfo } from "../../commons";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Slideshow,
  Favorite,
  Notifications,
  HelpCenter,
  Logout,
} from "@mui/icons-material";
import "./style.scss";
function SideBar() {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    if (user.googleId) {
      window.open("http://localhost:5000/api/v1/auth/google/logout", "_self");
    } else {
      localStorage.removeItem("token");
      dispatch(setAuth(null));
      navigate("/");
    }
  };
  return (
    <div className="side-bar">
      <ul>
        <NavLink
          to="/tai-khoan/phim-dang-xem"
          className={({ isActive }) =>
            isActive ? "link link-active" : "link "
          }
        >
          <Slideshow className="icon"></Slideshow>
          Phim đang xem
        </NavLink>
        <NavLink
          to="/tai-khoan/yeu-thich"
          className={({ isActive }) =>
            isActive ? "link link-active" : "link "
          }
        >
          <Favorite className="icon"></Favorite>
          Yêu thích
        </NavLink>
        <NavLink
          to="/tai-khoan/thong-tin-ca-nhan"
          className={({ isActive }) =>
            isActive ? "link link-active" : "link "
          }
        >
          <AccountCircle className="icon"></AccountCircle>Hồ sơ
        </NavLink>
        <div
          // to="/tai-khoan/thong-bao"
          // className={({ isActive }) =>
          //   isActive ? "link link-active" : "link "
          // }
          onClick={()=>messageInfo('Chức năng đang được cập nhật')}
          className="link"
        >
          <Notifications className="icon"></Notifications>
          Thông báo
        </div>
        <div
        onClick={()=>messageInfo('Chức năng đang được cập nhật')}
          // to="/tai-khoan/tro-giup-va-bao-loi"
          // className={({ isActive }) =>
          //   isActive ? "link link-active" : "link "
          // }
          className="link"
        >
          <HelpCenter className="icon"></HelpCenter>
          Trợ giúp và báo lỗi
        </div>
        <div onClick={handleLogout} className="link">
          <Logout className="icon"></Logout>
          Đăng xuất
        </div>
      </ul>
    </div>
  );
}

export default SideBar;
