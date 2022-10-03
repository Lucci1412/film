import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Comments from "../Comments/index";
import { addWatchMovie, getUser } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { favoriteMovie } from "../../redux/userSlice";
import { userRequest, publicRequest } from "../../commons/api";
import { messageFail, messageSuccess } from "../../commons";
import "./style.scss";
function MovieDetail({ movie }) {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  console.log(movie)
  const handleFavorite = async () => {
    try {
      if (user) {
        const res = await userRequest.put(
          `/user/favorite/${user._id}/${movie._id}`
        );
        if (res.data.success) {
          dispatch(favoriteMovie(res.data.user));
          messageSuccess(res.data.message);
        }
      } else {
        messageFail("Bạn chưa đăng nhập");
      }
    } catch (error) {
      console.log(error);
      messageFail("Lỗi hệ thống");
    }
  };
  const handleViewMovie = async (link, name, slug) => {
    try {
      // update view
      await publicRequest.put(`/movie/views/${movie?._id}`);
      // update watching movie
      if (user) {
        const data = {
          link_embed: link,
          name: name,
          slug: slug,
          movieId: movie?._id,
        };
        const res = await publicRequest.put(`/user/watch/${user?._id}`, data);
        res.data && dispatch(addWatchMovie(res.data.user));
      }
      window.location = link;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="movie-detail">
      <div className="movie-detail-top">
        <img src={ movie.poster_url ||movie.thumb_url } alt="" />
        <div className="movie-detail-info">
          <h4>{movie.name}</h4>
          <h5>{movie.origin_name}</h5>
          <span>{`Số tập: ${movie.episode_total}`}</span>
          <span>{`Trạng thái: ${
            movie.status === "ongoing" ? "Đang ra" : "Hoàn thành "
          }`}</span>
          <span>
            Diễn viên:
            {movie.actor.length !== 1
              ? movie.actor.map((name, index) => {
                  return (
                    <strong key={index}>
                      {" "}
                      <Link to={`/dien-vien/${name}`} className="actor-link">
                        {name},
                      </Link>
                    </strong>
                  );
                })
              : " Đang cập nhật"}
          </span>
          <span>
            Thể loại:
            {movie.category &&
              movie.category.map((name, index) => {
                return <strong key={index}> {name},</strong>;
              })}
          </span>
          <span>
            Quốc gia:
            {movie.country &&
              movie.country.map((name, index) => {
                return <strong key={index}> {name},</strong>;
              })}
          </span>
          <span>{`Thời lượng: ${movie.time}`}</span>
          <span>{`Năm xuất bản: ${movie.year}`}</span>
          <span>{`Lượt xem: Đang cập nhật`}</span>
          <div style={{ marginTop: "10px" }}>
            <Button
              onClick={
                movie.episode_current !== "Trailer"
                  ? () =>
                      handleViewMovie(
                        movie.server_data[0].link_embed,
                        movie.server_data[0].name,
                        movie.server_data[0].slug
                      )
                  : undefined
              }
              variant="contained"
              color="success"
            >
              Xem phim
            </Button>
            {user ? (
              <Button onClick={handleFavorite} variant="outlined" color="error">
                {user.favorite.includes(movie?._id)
                  ? "Hủy yêu thích"
                  : "Yêu thích"}
              </Button>
            ) : (
              <Button onClick={handleFavorite} variant="outlined" color="error">
                Yêu thích
              </Button>
            )}
          </div>
        </div>
      </div>
      {movie.type !== "single" && movie.episode_current !== "Trailer" && (
        <div className="movie-detail-episodes">
          <h3>Danh sách tập </h3>
          <Button
            variant="outlined"
            className="movie-detail-lang"
            color="error"
          >
            {movie.server_name}
          </Button>
          <ul>
            {movie.server_data &&
              movie.server_data.map((item, index) => {
                return (
                  <Button
                    onClick={
                      movie.episode_current !== "Trailer"
                        ? () =>
                            handleViewMovie(
                              item.link_embed,
                              item.name,
                              item.slug
                            )
                        : "undefined"
                    }
                    key={index}
                    variant="contained"
                    color="success"
                    className="movie-detail-link"
                  >
                    {`Tập ${item.name}`}
                  </Button>
                );
              })}
          </ul>
        </div>
      )}
      <div className="movie-detail-content">
        <h4>Nội dung phim</h4>
        <p>{movie.content}</p>
      </div>
      <div className="movie-detail-comment">
        <h4>Bình luận</h4>
        <p>Vui lòng đăng nhập để bình luận :v</p>
        <div className="list">
          <Comments movieId={movie?._id}></Comments>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
