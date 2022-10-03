import React from "react";
import Modal from "@mui/material/Modal";
import {Link} from 'react-router-dom'
import "./style.scss";

export default function Menu({showMenu,onClose}) {
  return (
    <div >
      <Modal open={showMenu} onClose={onClose}>
        <>
        <div className="menu">
          <Link to='/' className="link">Trang chủ</Link>
          <Link to='/phim-moi' className="link">Phim mới</Link>
          <Link to='/phim-bo' className="link">Phim bộ</Link>
          <Link to='/phim-le' className="link">Phim lẻ</Link>
          <Link to='/hoat-hinh' className="link">Hoạt hình</Link>
          <Link to='/game-show' className="link">Game show</Link>
          <Link to='/chieu-rap' className="link">Chiếu rạp</Link>
          <Link to='/the-loai/phim-18+' className="link">18+</Link>
          <Link to='/' className="link">Tìm kiếm ...</Link>
        </div></>
      </Modal>
    </div>
  );
}
