import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Google, Facebook } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { messageFail, messageInfo, messageSuccess } from "../../commons";
import CircularProgress from "@mui/material/CircularProgress";
import { publicRequest } from "../../commons/api";
import { loginSuccess } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import "./style.scss";
function LoginForm({onClose}) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.post("auth/user/login", login);
      if (res.data.success) {
      onClose()
      setLoading(false);
      messageSuccess('Đăng nhập thành công')
      dispatch(loginSuccess(res.data.user));
      localStorage.setItem('token',JSON.stringify(res.data.token));
    }else{
      setLoading(false);
      messageFail(res.data.message)
      localStorage.removeItem('token');
    }
    } catch (error) {
      console.log(error)
      setLoading(false);
      messageFail('Đăng nhập thất bại. Vui lòng thử lại sau')
    }
    
  };
  const handleLoginFacebook = () => {
    messageInfo("Tính năng đang cập nhật :v");
  };
  const handleLoginGoogle = async () => {
    const googleUrl = "http://localhost:5000/api/v1/auth/google";
    window.open(googleUrl, "_self");
  };
  return (
    <div className="login-form">
      <TextField
        autoComplete="off"
        label="Địa chỉ email"
        margin="dense"
        size="small"
        onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        autoComplete="off"
        label="Mật khẩu"
        size="small"
        onChange={(e) => setLogin({ ...login, password: e.target.value })}
      />
      <div onClick={() => setShowPassword(!showPassword)} className="label">
        <input
          checked={showPassword}
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
        />
        <p>Hiện mật khẩu</p>
      </div>

      <Button onClick={handleLogin} variant="contained">
      {loading ? <CircularProgress size={20} color='inherit' style={{margin:'6px 0'}}/> : "Đăng nhập"}
      </Button>
      <span className="login-form-span">hoặc</span>
      <div className="login-form-button">
        <Button
          onClick={handleLoginFacebook}
          className="button-facebook"
          variant="outlined"
        >
          <Facebook className="icon"></Facebook>
          <p>Facebook</p>
        </Button>
        <Button
          onClick={handleLoginGoogle}
          className="button-google"
          variant="outlined"
        >
          <Google className="icon"></Google>
          <p>Google</p>
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
