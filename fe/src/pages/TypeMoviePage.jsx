import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import MovieList from "../components/MovieList";
import { useLocation } from "react-router-dom";
import { typeMovies } from "../commons/index";
import useQueryMovie from "../hooks/useQueryMovie";
import "./style.scss";
function TypeMoviePage() {
  const [movies, setMovies] = useState([]);
  const limit = 18;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { pathname, key } = useLocation();
  let name;
  for (let type of typeMovies) {
    if (type.path === pathname) {
      name = type.origin;
      break;
    }
  }
  const { data, loading } = useQueryMovie(
    `movie/type/${name}?page=${currentPage}&limit=${limit}`
  );
  useEffect(() => {
    if (data) {
      setMovies(data.movies);
      setTotalPage(data.total_page);
    }
  }, [data, pathname]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [key, currentPage]);
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

export default TypeMoviePage;
