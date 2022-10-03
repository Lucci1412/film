import React, { useState, useEffect } from "react";
import { publicRequest } from "../../commons/api";
import {Link} from 'react-router-dom'
import "./style.scss";
function Rank() {
  const [movies, setMovies] = useState(null);
  const tabs = document.querySelectorAll(".tab-item");
  const panes = document.querySelectorAll(".pane-item");
  tabs.forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick = function () {
      document
        .querySelector(".tab-item-active")
        .classList.remove("tab-item-active");
      document
        .querySelector(".pane-item-active")
        .classList.remove("pane-item-active");
      tab.classList.add("tab-item-active");
      pane.classList.add("pane-item-active");
    };
  });
  useEffect(() => {
    const getMovies = async () => {
      const res = await publicRequest.get("movie/type/series?limit=5&top=true");
      setMovies(res.data.movies);
    };
    getMovies();
  }, []);
  const handleGetTopMovies = async (value) => {
    if (value === 1) {
      const res = await publicRequest.get("movie/type/series?limit=5&top=true");
      setMovies(res.data.movies);
    } else if (value === 2) {
      const res = await publicRequest.get("movie/type/single?limit=5&top=true");
      setMovies(res.data.movies);
    } else if (value === 3) {
      const res = await publicRequest.get(
        "movie/type/hoathinh?limit=5&top=true"
      );
      setMovies(res.data.movies);
    }
  };
  return (
    <div className="rank">
      <div className="rank-header">
        <span
          onClick={() => handleGetTopMovies(1)}
          className="tab-item tab-item-active"
        >
          Phim bộ
        </span>
        <span onClick={() => handleGetTopMovies(2)} className="tab-item">
          Phim lẻ
        </span>
        <span onClick={() => handleGetTopMovies(3)} className="tab-item">
          Hoạt hình
        </span>
      </div>
      <div className="pane-item pane-item-active">
        <div className="rank-list">
          {movies &&
            movies.map((item, index) => {
              return (
                <li key={index}>
                  <img src={item.thumb_url || item.poster_url} alt="" />
                  <div className="info">
                  <Link to={`/phim/${item.slug}`} className='link'> <h4>{item.name}</h4></Link>
                    <span>{item.origin_name}</span>
                    <span>{`Lượt xem: ${item.views}`}</span>
                  </div>
                </li>
              );
            })}
        </div>
      </div>
      <div className="pane-item ">
        <div className="rank-list">
          {movies &&
            movies.map((item, index) => {
              return (
                <li key={index}>
                  <img src={item.thumb_url || item.poster_url} alt="" />
                  <div className="info">
                   <Link to={`/phim/${item.slug}`} className='link'> <h4>{item.name}</h4></Link>
                    <span>{item.origin_name}</span>
                    <span>{`Lượt xem: ${item.views}`}</span>
                  </div>
                </li>
              );
            })}
        </div>
      </div>
      <div className="pane-item ">
        <div className="rank-list">
          {movies &&
            movies.map((item, index) => {
              return (
                <li key={index}>
                  <img src={item.thumb_url || item.poster_url} alt="" />
                  <div className="info">
                  <Link to={`/phim/${item.slug}`} className='link'> <h4>{item.name}</h4></Link>
                    <span>{item.origin_name}</span>
                    <span>{`Lượt xem: ${item.views}`}</span>
                  </div>
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Rank;
