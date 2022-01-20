import React, { useEffect } from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ selected_playlist, playing }, dispatch] = useDataLayerValue();

  const playPlaylist = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:${selected_playlist.id}`,
      })
      .then(() => {
          dispatch({
            type: "SET_CURRENT_SELECTED_TRACK",
            track: selected_playlist.tracks[0]
          })
          if (!playing) {
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
          }
        }
      );
  };

  const playSong = (item) => {
    dispatch({
      type: "SET_SELECTED_TRACK",
      track: item.track,
    });
    if (!playing) {
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
    spotify
      .play({
        uris: [`spotify:track:${item.track.id}`],
      })
      .then(() => {
        console.log(`%cPlayback started`, "color:green");
      });
  };

  // Fetch user playlists then set current playlist to first playlist
  useEffect(() => {
    console.log(`%cBODY RENDERED in useEffect []`, `color: purple`)
    const fetchPlaylist = async () => await spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlists,
      });
      spotify.getPlaylist(playlists.items[0].id).then((response) => {
      dispatch({
        type: "SET_SELECTED_PLAYLIST",
        selected_playlist: response,
      });
    })
  })
    fetchPlaylist()
  }, [spotify, dispatch])

  return (
    <div className="body">
      <Header />
      <div className="body_info">
        <img
          className="album_cover"
          src={selected_playlist?.images[0].url}
          alt="Album cover"
        />
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h2>{selected_playlist?.name}</h2>
          <p>{selected_playlist?.description}</p>
        </div>
      </div>

      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledIcon className="body_shuffle body_green" onClick={playPlaylist}/>
          <FavoriteIcon className="body_green" fontSize="large" />
          <MoreHorizIcon />
        </div>
        {selected_playlist?.tracks?.items.map((item, i) => (
          <SongRow i={i} item={item} playSong={playSong} />
        ))}
      </div>
    </div>
  );
}

export default Body;
