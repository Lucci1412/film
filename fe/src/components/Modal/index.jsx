import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import "./style.scss";
function ModalLogin({ showModal, closeModal }) {
  const [showLogin, setShowLogin] = useState(true);
  const showForm = (value) => {
    value === 1 ? setShowLogin(true) : setShowLogin(false);
  };
  return (
    <div className="modal-login">
      <Modal open={showModal} onClose={closeModal}>
        <div className="auth-form">
          <span>
            <h4
              className={showLogin ? "auth-form-active" : ""}
              onClick={() => showForm(1)}
            >
              Đăng nhập
            </h4>
            <h4
              className={!showLogin ? "auth-form-active" : ""}
              onClick={() => showForm(2)}
            >
              Đăng kí
            </h4>
          </span>
          {showLogin ? (
            <LoginForm onClose={closeModal} />
          ) : (
            <RegisterForm onShowLogin={() => showForm(1)} />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ModalLogin;
