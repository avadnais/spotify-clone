import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useDataLayerValue } from "./DataLayer";

function Header({ spotify }) {
  const [{ user }, dispatch] = useDataLayerValue();

  const handleChange = (e) => {
    //dispatch results to null to reload previous playlist page when search is empty
    if (e.target.value === "") {
      dispatch({
        type: "SET_SEARCH_RESULTS",
        search_results: null,
      });
    }

    spotify
      .search(e.target.value, ["artist", "playlist", "track", "album"])
      .then((r) => {
        dispatch({
          type: "SET_SEARCH_RESULTS",
          search_results: r,
        });
      });
  };

  const handleLogout = () => {
    window.localStorage.clear();
    document.getElementById('logout').innerHTML = 'Login not saved'
  }

  return (
    <div className="header">
      <div className="header_left">
        <SearchIcon />
        <input
          id="searchInput"
          placeholder="Search for artists, songs, or podcasts"
          type="text"
          onChange={handleChange}
        />
      </div>

      <div className="header_right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <div className="header_right_text">
          <h4>{user?.display_name}</h4>
          <p onClick={handleLogout} id="logout">Don't save login</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
