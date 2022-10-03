import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../../commons/api";
import { getUser, updateAvatar, updateInfo } from "../../redux/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { messageFail, messageSuccess } from "../../commons";
import "./style.scss";
function Profile() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    sex: user?.sex,
    username: user?.username || "",
    password: user?.password || "",
    birthday: user?.birthday || "",
  });

  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateInfo = async () => {
    if (info.username.length < 3)
      return messageFail("Tên tài khoản quá ngắn hoặc quá dài");
    try {
      if (info.password.length === 0) {
        const { password, ...data } = info;
        const res = await userRequest.put(`/user/info/${user._id}`, data);
        dispatch(updateInfo(res.data.user));

        messageSuccess(res.data.message);
      } else {
        const res = await userRequest.put(`/user/info/${user._id}`, info);
        dispatch(updateInfo(res.data.user));
        messageSuccess(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateAvatar = async () => {
    if (avatar) {
      setLoading(true);
      const data = new FormData();
      data.append("avatar", avatar);
      try {
        const res = await userRequest.put(`/user/avatar/${user._id}`, data);
        if (res.data.success) {
          dispatch(updateAvatar(res.data.user));
          messageSuccess(res.data.message);
          setAvatar(null);
          setLoading(false);
        }
      } catch (error) {
        messageFail("Cập nhật thất bại");
        setLoading(false);
        console.log(error);
      }
    } else {
      messageFail("Bạn chưa chọn ảnh");
    }
  };

  return (
    <div className="profile ">
      <div className="avatar">
        <h3>Cập nhật ảnh đại diện</h3>
        <div className="profile-form">
          <div className="avatar-main">
            <img src={user?.avatar} alt="" />
            <div className="avatar-input">
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <Button
                className="btn"
                disabled={loading ? true : false}
                onClick={handleUpdateAvatar}
                variant="contained"
              >
                {loading ? (
                  <CircularProgress
                    size={20}
                    color="inherit"
                    style={{ margin: "0" }}
                  />
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="info">
        <h3>Cập nhật thông tin</h3>
        <div className="profile-form">
          <div className="profile-left">
            <span>Tên tài khoản</span>
            <input
              type="text"
              autoComplete="off"
              placeholder={user?.username}
              onChange={(e) =>
                setInfo({ ...info, username: e.target.value.trim() })
              }
            />
            <span>Ngày sinh</span>
            <input
              type="text"
              autoComplete="off"
              placeholder={user?.birthday}
              onChange={(e) =>
                setInfo({ ...info, birthday: e.target.value.trim() })
              }
            />
          </div>
          <div className="profile-right">
            <span>Giới tính</span>
            <input
              type="text"
              autoComplete="off"
              placeholder={user?.sex}
              onChange={(e) => setInfo({ ...info, sex: e.target.value.trim() })}
            />
            <span>Mật khẩu</span>
            <input
              autoComplete="off"
              type="password"
              placeholder=""
              onChange={(e) =>
                setInfo({ ...info, password: e.target.value.trim() })
              }
            />
          </div>
        </div>
        <Button
          style={{ width: "120px", margin: "auto" }}
          variant="contained"
          onClick={handleUpdateInfo}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
}

export default Profile;
