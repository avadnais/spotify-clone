import React from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ selected_playlist, playing }, dispatch] = useDataLayerValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:${id}`,
      })
      .then(
        spotify.getMyCurrentPlaybackState().then((reponse) => {
          dispatch({
            type: "SET_CURRENT_PLAYBACK_STATE",
            current_playback_state: reponse,
          });
        })
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
          <PlayCircleFilledIcon className="body_shuffle body_green" />
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
