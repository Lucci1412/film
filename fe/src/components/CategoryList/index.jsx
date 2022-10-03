import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { categoryMovies } from "../../commons";
import "./style.scss";
function CategoryList() {
  const [list,setList]=useState(null)
  useEffect(() => {
  const a=  categoryMovies.sort((a, b)=>{
      const nameA = a.origin.toUpperCase(),nameB = b.origin.toUpperCase(); 
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setList(a)
  }, [])
  
  return (
    <div className="navigation-category">
      <div className="row">
        {list &&
          list.map((item, index) => {
            return (
              <div key={index} className="col-category col-lg-4 col-xl-4">
                <Link to={`/the-loai/${item.path}`}  className="link">
                 {item.origin}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CategoryList;
