import React, { useState,useEffect } from "react";
import { NavLink,useLocation } from "react-router-dom";
import CountryList from "../CountryList";
import CategoryList from "../CategoryList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./style.scss";
function NavigationTop() {
  const [category,setCategory]=useState(false);
  const [ country,setCountry]=useState(false);
  const params=useLocation()
  useEffect(() => {
    setCategory(false);
    setCountry(false)
  }, [params.key])
  
  const handleShownavigation=(value)=>{
    if(value===1){
      setCategory(!category);
      setCountry(false)
    }
    else{
      setCategory(false);
      setCountry(!country)
    }
  }
  return (
    <div className="navigation ">
      <div className="container">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navigation-link navigation-link-active" : "navigation-link "
        }
      >
        Trang chủ
      </NavLink>
      <NavLink
        to="/phim-moi"
        className={({ isActive }) =>
          isActive ? "navigation-link navigation-link-active" : "navigation-link "
        }
      >
        Phim mới
      </NavLink>
      <NavLink
        to="/phim-bo"
        className={({ isActive }) =>
          isActive ? "navigation-link navigation-link-active" : "navigation-link "
        }
      >
        Phim bộ{" "}
      </NavLink>
      <NavLink
        to="/phim-le"
        className={({ isActive }) =>
          isActive ? "navigation-link navigation-link-active" : "navigation-link "
        }
      >
        Phim lẻ
      </NavLink>
      <NavLink
        to="/hoat-hinh"
        className={({ isActive }) =>
          isActive ? "navigation-link navigation-link-active" : "navigation-link "
        }
      >
        Hoạt hình
      </NavLink>
      <NavLink
        to="/game-show"
        className={({ isActive }) =>
          isActive ? "navigation-link navigation-link-active" : "navigation-link "
        }
      >
        Game show
      </NavLink>
      <div className="navigation-link" onClick={()=>handleShownavigation(1)}>
        Thể loại
        <KeyboardArrowDownIcon />
        {category&&<CategoryList></CategoryList>}
      </div>
      <div className="navigation-link" onClick={()=>handleShownavigation(2)}>
        Quốc gia
        <KeyboardArrowDownIcon />
        {country&&<CountryList></CountryList>}
      </div>
      <NavLink
        to="/chieu-rap"
        className={({ isActive }) =>
          isActive ? "navigation-link navigation-link-active" : "navigation-link "
        }
      >
        Chiếu rạp
      </NavLink>
      </div>
    </div>
  );
}

export default NavigationTop
