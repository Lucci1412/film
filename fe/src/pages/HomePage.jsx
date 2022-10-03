import React, { useState, useEffect, useLayoutEffect } from "react";
import Slider from "../components/Slider/index";
import MovieList from "../components/MovieList";
import Rank from "../components/Rank";
import useQueryMovie from "../hooks/useQueryMovie";
import { useLocation } from "react-router-dom";
import "./style.scss";
function HomePage() {
  const [deputeMovies, setDeputeMovies] = useState([]);
  const [modifiedMovies, setModifiedMovies] = useState([]);
  const [fullMovies, setFullMovies] = useState([]);
  // const [currentPage, setCurrentPage] = useState([]);
  // const [totalPage, setTotalPage] = useState([]);
  const { key } = useLocation();
  const data1 = useQueryMovie(`movie/type/series?limit=${18}`);
  const data2 = useQueryMovie(`movie/modified/2022?limit=${18}`);
  const data3 = useQueryMovie(`movie/full?page=${1}&limit=${18}`);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [key]);
  useLayoutEffect(() => {
    if (data1.data) setDeputeMovies(data1.data.movies);
    if (data2.data) setModifiedMovies(data2.data.movies);
    if (data3.data) setFullMovies(data3.data.movies);
  }, [data1, data2, data3]);
  return (
    <div className="home-page">
      <div className="home-page-top">
        <Slider></Slider>
        <Rank></Rank>
      </div>
      <MovieList
        title="Đề cử"
        data={deputeMovies}
        load={data1?.loading}
      ></MovieList>
      <MovieList
        title="Mới cập nhật"
        data={modifiedMovies}
        load={data2?.loading}
      ></MovieList>
      <MovieList
        title="Đã hoàn thành"
        data={fullMovies}
        load={data3?.loading}
      ></MovieList>
    </div>
  );
}

export default HomePage;
