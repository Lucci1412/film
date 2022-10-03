import React,{useState,useEffect} from "react";
import MovieItem from "../MovieItem/index";
import CircularProgress from "@mui/material/CircularProgress";

import "./style.scss";
function MovieList({ title, data ,load}) {
  const [loading,setLoading]=useState(load)
  useEffect(() => {
    setLoading(load)
  }, [load])
  
  return (
    <div className="movie-list">
      {title && <h3> {title}</h3>}
      <div className="row">
        {!loading ? (
          data.map((movie, index) => {
            return <MovieItem key={index} movie={movie} />;
          })
        ) : (
         <div className="movie-list-load">
           <CircularProgress size={40} />
         </div>
        )}
      </div>
    </div>
  );
}

export default MovieList;
