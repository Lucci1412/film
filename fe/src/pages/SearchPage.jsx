import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import MovieList from "../components/MovieList";
import { useParams } from "react-router-dom";
import useQueryMovie from "../hooks/useQueryMovie";
import "./style.scss";
function SearchPage() {
  const [movies, setMovies] = useState([]);
  const limit = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { key } = useParams();
  const [noSearchData, setNoSearchData] = useState(false);
  const { data, loading } = useQueryMovie(
    `movie/search/${key}?page=${currentPage}&limit=${limit}`
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [key, currentPage]);
  useEffect(() => {
    if (data) {
      setTotalPage(data.total_page);
      setMovies(data.movies);
      data.movies.length === 0 ? setNoSearchData(true) : setNoSearchData(false);
    }
  }, [data, key]);

  return (
    <div className="search-page">
      <MovieList load={loading} data={movies}></MovieList>
      {noSearchData ? (
        <div className="no-search">
          <h3>{`Không tìm thấy kết quả với từ khóa "${key}"`}</h3>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default SearchPage;
