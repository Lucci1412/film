import {useState} from "react";
import { useLocation } from "react-router-dom";

const useUrl = () => {
    const [url,setUrl]=useState(null);
    const {pathname}=useLocation()
  if(pathname==='/') setUrl(2)
  if(pathname==='/phim-moi') setUrl(2)
  if(pathname==='/p')
  return { url };
};

export default useUrl;
