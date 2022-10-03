import React, { useState, useEffect } from "react";
import MovieUserItem from "../MovieUserItem";
import { getUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./style.scss";
const MovieUserList = () => {
 const {pathname}=useLocation()
 
  const user = useSelector(getUser);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (pathname === "/tai-khoan/phim-dang-xem") setValue(1);
    if (pathname === "/tai-khoan/yeu-thich") setValue(0);
  }, [pathname]);

  return (
    <>
      {value === 0 && (
        <div className="favorite-list">
          {user && user.favorite.length !== 0 ? (
            <>
              {user.favorite.map((id) => {
                return <MovieUserItem key={id} id={id} />;
              })}
            </>
          ) : (
            <div className="no-favorite">
              <span>Chưa có bộ phim yêu thích nào :v</span>
            </div>
          )}
        </div>
      )}
      {value === 1 && (
        <div className="favorite-list">
          {user && user.watch.length !== 0 ? (
            <>
              {user.watch.map((movie) => {
                return (
                  <MovieUserItem
                    key={movie.movieId}
                    id={movie.movieId}
                    watch={movie}
                  />
                );
              })}
            </>
          ) : (
            <div className="no-favorite">
              <span>Bạn chưa xem bộ phim nào :v</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieUserList;
