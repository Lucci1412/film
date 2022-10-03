import React, { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import useQueryMovie from "../hooks/useQueryMovie";
import "./style.scss";
function MovieDetailPage() {
  const [movie, setMovie] = useState(null);
  const { slug } = useParams();
  const { data } = useQueryMovie(`movie/detail/?slug=${slug}`);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (data) setMovie(data.movie);
  }, [data]);
  return (
    
      <div className="movie-detail-page">
        {movie ? (
          <MovieDetail movie={movie}></MovieDetail>
        ) : (
          <CircularProgress size={30} />
        )}
      
    </div>
  );
}

export default MovieDetailPage;
