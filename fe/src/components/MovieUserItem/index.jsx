import React, { useEffect, useState } from "react";
import {
  getUser,
  favoriteMovie,
  deleteWatchMovie,
} from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../../commons/api";
import { messageSuccess, messageFail } from "../../commons";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./style.scss";
const MovieUserItem = ({ id, watch }) => {
  const [movie, setMovie] = useState(null);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMovie = async () => {
      const res = await userRequest.get(`movie/detail/?id=${id}`);
      if (res.data.success) setMovie(res.data.movie);
    };
    getMovie();
  }, [id]);
  const handleDeleteWatch = async () => {
    try {
      const res = await userRequest.delete(
        `/user/watch/${user._id}/${movie._id}`
      );
      if (res.data) dispatch(deleteWatchMovie(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };
  const handleFavorite = async () => {
    try {
      if (user) {
        const res = await userRequest.put(`/user/favorite/${user._id}/${id}`);
        if (res.data.success) {
          dispatch(favoriteMovie(res.data.user));
          messageSuccess(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      messageFail("Lỗi hệ thống");
    }
  };
  return (
    <div className="movie-user-item">
      <img src={movie?.thumb_url || movie?.poster_url} alt="" />
      <div className="info">
        <Link to={`/phim/${movie?.slug}`} className="link">
          {movie?.name}
        </Link>
        {watch?.link_embed ? (
          <span>{`Đã xem: ${watch.slug}/${movie?.episode_total.length===0? ' Đang cập nhật':movie?.episode_total.length} `}</span>
        ) : (
          <span>{movie?.year}</span>
        )}
        {!watch?.link_embed ? (
          <div className="btn">
            <Link to={`phim/${movie?.slug}`} className="link">
              <Button variant="contained" color="success">
                Xem phim
              </Button>
            </Link>
            <Button
              onClick={handleFavorite}
              style={{ marginLeft: "12px" }}
              variant="outlined"
              color="error"
            >
              Hủy yêu thích
            </Button>
          </div>
        ) : (
          <div className="btn">
            <Link to={`/phim/${movie?.slug}`} className="link">
              <Button variant="contained" color="success">
                Tiếp tục xem
              </Button>
            </Link>
            <Button
              onClick={handleDeleteWatch}
              style={{ marginLeft: "12px" }}
              variant="outlined"
              color="error"
            >
              Xóa khỏi danh sách
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieUserItem;
