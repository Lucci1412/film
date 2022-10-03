import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import MovieList from "../components/MovieList";
import { useParams } from "react-router-dom";
import useQueryMovie from "../hooks/useQueryMovie";
import { countryMovies } from "../commons/index";
import "./style.scss";
function TypeMoviePage() {
  const [movies, setMovies] = useState([]);
  const limit = 18;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { key } = useParams();
  let name;
  for (let type of countryMovies) {
    if (type.path === key) {
      name = type.origin;
      break;
    }
  }
  const { data, loading } = useQueryMovie(
    `movie/country/${name}?page=${currentPage}&limit=${limit}`
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [key, currentPage]);
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

export default TypeMoviePage;
