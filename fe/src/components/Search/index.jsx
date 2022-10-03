import React, { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function Search() {
  // const [key, setKey] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const key = inputRef.current.value;
    if (key.length !== 0) navigate(`/tim-kiem/${key}`);
  };
  return (
    <div className="header-search">
      <form onSubmit={handleSearch} action="" className="form">
        <SearchIcon onClick={handleSearch} className="icon" />
        <input
          type="text"
          ref={inputRef}
          placeholder="Tìm kiếm tên phim, diễn viên,..."
        />
      </form>
    </div>
  );
}

export default Search;
