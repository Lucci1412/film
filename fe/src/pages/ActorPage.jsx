import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import MovieList from "../components/MovieList";
import { useParams } from "react-router-dom";
import useQueryMovie from "../hooks/useQueryMovie";
import "./style.scss";
function ActorPage() {
  const [movies, setMovies] = useState([]);
  const limit = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { key } = useParams();
  const { data, loading } = useQueryMovie(
    `movie/actor/${key}?page=${currentPage}&limit=${limit}`
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [key, currentPage]);
  useEffect(() => {
    if (data) {
      setMovies(data.movies);
      setTotalPage(data.total_page);
    }
  }, [data, key]);

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

export default ActorPage;
