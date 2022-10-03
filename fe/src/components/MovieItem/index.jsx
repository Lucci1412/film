import React from "react";
import {Link} from 'react-router-dom'
import LoadImg from "../../commons/LoadImg";
import "./style.scss";
function MovieItem({ movie }) {
  return (
    <div className="movie-col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div className="movie-item">
        <div className="movie-item-status">{`${movie.episode_current} VietSub`}</div>
        <Link className='img' to={`/phim/${movie.slug}`}> <LoadImg  url={movie.thumb_url || movie.poster_url} /></Link>
        <Link to={`/phim/${movie.slug}`} className="movie-item-link">{movie.name}</Link>
      </div>
    </div>
  );
}

export default MovieItem;
