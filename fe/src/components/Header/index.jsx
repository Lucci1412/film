import React, { useState, useEffect } from "react";
import Search from "../Search";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation } from "react-router-dom";
import ModalLogin from "../Modal/index";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/userSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import Menu from "../Menu";
import "./style.scss";

function Header() {
  const user = useSelector(getUser);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const {key}=useLocation()

 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowMenu(false);
  }, [key]);

  return (
    <div className="header">
      <div className="container">
        <div className="header-menu">
          <MenuIcon
            className="icon"
            onClick={() => setShowMenu(true)}
          ></MenuIcon>
          {showMenu && (
            <Menu showMenu={showMenu} onClose={() => setShowMenu(false)}></Menu>
          )}
        </div>
        <Link to="/" className="logo">
          Ghiền Phim
        </Link>
        <Search />
        <div className="header-info">
          {!user ? (
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              variant="contained"
              color="success"
            >
              Đăng nhập
            </Button>
          ) : (
            <Link to="/tai-khoan/phim-dang-xem" className="link">
              <span>
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt="avatar"
                  src={user.avatar}
                />
                <h4>{user.username}</h4>
              </span>
            </Link>
          )}
        </div>
      </div>
      <ModalLogin
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      ></ModalLogin>
    </div>
  );
}

export default Header;
