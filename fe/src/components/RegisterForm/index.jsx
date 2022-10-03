import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { messageFail,messageSuccess } from "../../commons";
import { publicRequest } from "../../commons/api";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import "./style.scss";
function RegisterForm({ onShowLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [register, setRegister] = useState({
    email: "",
    password: "",
    username: "",
    repassword: "",
  });
  const handleRegister = async () => {
    setLoading(true);
    if (
      register.email.length === 0 ||
      register.username.length === 0 ||
      register.password.length === 0
    ) {
      setLoading(false);
      messageFail("Vui lòng nhập đủ thông tin");
    } else if (register.username.length < 3 || register.username.length > 50) {
      setLoading(false);
      messageFail("Tên nhân vật quá ngắn hoặc quá dài");
    } else if (register.password < 6) {
      setLoading(false);
      messageFail("Mật khẩu tối thiểu 6 kí tự");
    } else if (register.password !== register.repassword) {
      setLoading(false);
      messageFail("Mật khẩu nhập lại không chính xác");
    } else {
      const res = await publicRequest.post("auth/user/register", register);
      if (res.data.success) {
        messageSuccess(res.data.message);
        onShowLogin()
      }
      else{
        messageFail(res.data.message);
        setLoading(false);
      }
    }
  };
  return (
    <div className="register-form">
      <TextField
        autoComplete="off"
        label="Địa chỉ email"
        margin="dense"
        size="small"
        onChange={(e) =>
          setRegister({ ...register, email: e.target.value.trim() })
        }
      />
      <TextField
        autoComplete="off"
        label="Tên nhân vật"
        margin="dense"
        size="small"
        onChange={(e) =>
          setRegister({ ...register, username: e.target.value.trim() })
        }
      />
      <TextField
        type={showPassword ? "text" : "password"}
        autoComplete="off"
        label="Mật khẩu"
        size="small"
        onChange={(e) =>
          setRegister({ ...register, password: e.target.value.trim() })
        }
      />
      <TextField
        type={showPassword ? "text" : "password"}
        autoComplete="off"
        label="Nhập lại mật khẩu"
        size="small"
        onChange={(e) =>
          setRegister({ ...register, repassword: e.target.value.trim() })
        }
      />
      <div onClick={() => setShowPassword(!showPassword)} className="label">
        <input
          checked={showPassword}
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
        />
        <p>Hiện mật khẩu</p>
      </div>
      <Button onClick={handleRegister} variant="contained">
        {loading ? (
          <CircularProgress
            size={20}
            color="inherit"
            style={{ margin: "6px 0" }}
          />
        ) : (
          "Đăng kí"
        )}
      </Button>
    </div>
  );
}

export default RegisterForm;
