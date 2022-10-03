import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { countryMovies } from "../../commons";
import "./style.scss";
function CountryList() {
  const [list,setList]=useState(null)
  useEffect(() => {
  const a=  countryMovies.sort((a, b)=>{
      const nameA = a.origin.toUpperCase(),nameB = b.origin.toUpperCase(); 
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setList(a)
  }, [])
  
  return (
    <div className="navigation-country">
      <div className="row">
        {list &&
          list.map((item, index) => {
            return (
              <div key={index} className="col-country col-lg-4 col-xl-4">
                <Link to={`/quoc-gia/${item.path}`}  className="link">
                 {item.origin}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CountryList;
