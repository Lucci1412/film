import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import MovieList from "../components/MovieList";
import useQueryMovie from "../hooks/useQueryMovie";
import { useLocation } from "react-router-dom";

import "./style.scss";
function CommonMoviePage() {
  const [movies, setMovies] = useState([]);
  const limit = 18;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { pathname } = useLocation();
  const [url,setUrl]=useState(null)
  useEffect(() => {
    if(pathname==='/phim-moi') setUrl (`movie/year/${2022}?page=${currentPage}&limit=${limit}`)
    if(pathname==='/chieu-rap') setUrl(`movie/chieurap?page=${currentPage}&limit=${limit}`)
    if(pathname==='/') setUrl(`movie/chieurap?page=${currentPage}&limit=${limit}`)
  }, [pathname,currentPage])
  
  const { data, loading } = useQueryMovie(url);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, currentPage]);
  useEffect(() => {
    if (data) {
      setMovies(data.movies);
      setTotalPage(data.total_page);
    }
  }, [data]);

  return (
    <div className="new-movie-page">
      <MovieList load={loading} data={movies}></MovieList>
      <div className="pagination">
        {totalPage !== 1 && (
          <Pagination
            count={totalPage}
            onChange={(event, pageNumber) => setCurrentPage(pageNumber)}
            color="primary"
            shape="rounded"
          />
        )}
      </div>
    </div>
  );
}

export default CommonMoviePage;
