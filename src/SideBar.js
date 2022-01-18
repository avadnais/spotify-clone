import React, {useCallback} from "react";
import "./SideBar.css";
import SideBarOption from "./SideBarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { DataLayerContext, useDataLayerValue } from "./DataLayer";

function SideBar({spotify}) {
  const [{ playlists }, dispatch] = useDataLayerValue();

  const handleClick = (playlist) => { 
    spotify.getPlaylist(playlist.id).then(playlist => {
      dispatch({
      type: 'SET_SELECTED_PLAYLIST',
      selected_playlist: playlist
      }) 
    })
  }

  return (
    <div className="sidebar">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt="logo"
        className="logo"
      />
      <SideBarOption title="Home" Icon={HomeIcon} />
      <SideBarOption title="Search" Icon={SearchIcon} />
      <SideBarOption title="Your Library" Icon={LibraryMusicIcon} />
      <br />
      <strong className="sidebar_title">Playlists</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
          <SideBarOption 
          key={playlist.id} 
          title={playlist.name} 
          onClick={handleClick}
          playlist={playlist} />
      ))}
    </div>
    )
  }
export default SideBar;
