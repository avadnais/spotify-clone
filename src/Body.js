import React, { useEffect } from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";
import {
  SearchResultsTrack,
  SearchResultsAlbum,
  SearchResultsArtist,
  SearchResultsPlaylist,
} from "./SearchResults";
import { display } from "@mui/system";

function Body({ spotify }) {
  const [{ selected_playlist, playing, search_results }, dispatch] =
    useDataLayerValue();

  const play = (item, type, id) => {
    console.log(item);
    document.getElementById("searchInput").value = "";
    dispatch({
      type: "SET_SEARCH_RESULTS",
      search_results: null,
    });

    const makePlayCall = () => {
      if (type === "track") {
        spotify.play({ uris: [`spotify:${type}:${id}`] });
      } else {
        spotify.play({ context_uri: `spotify:${type}:${id}` }).then(() => {
          spotify.getPlaylist(id).then((r) => {
            dispatch({
              type: "SET_SELECTED_PLAYLIST",
              selected_playlist: r,
            });
          });
          if (!playing) {
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
          }
          dispatch({
            type: "SET_INDEX",
            index: 0,
          });
        });
      }
    };

    const getState = async () =>
      spotify.getMyCurrentPlaybackState().then((r) => {
        //console.log(`response of playback state`, r);
        dispatch({
          type: "SET_SELECTED_TRACK",
          track: r.item,
        });
      });

    makePlayCall();
    setTimeout(() => getState(), 700); // set this timeout because spotify will return unknown
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

  const handleClickPlaylist = () => {
    play(selected_playlist, "playlist", selected_playlist.id);
  };

  // Fetch user playlists then set current playlist to first playlist
  useEffect(() => {
    console.log(`%cBODY RENDERED in useEffect []`, `color: purple`);
    const fetchPlaylist = async () =>
      await spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
        spotify.getPlaylist(playlists.items[0].id).then((response) => {
          dispatch({
            type: "SET_SELECTED_PLAYLIST",
            selected_playlist: response,
          });
        });
      });

    fetchPlaylist();
  }, [spotify, dispatch]);

  if (search_results)
    return (
      <div className="body">
        <Header spotify={spotify} />
        <h1>Search results</h1>
        <div className="searchResults">
          <div className="searchResults_tracks">
            {search_results?.tracks?.items.map((item, i) => (
              <SearchResultsTrack i={i} track={item} play={play} />
            ))}
          </div>
          {/*           <h2>Albums</h2>
          <hr />
          <div className="searchResults_albums">
            {search_results?.albums?.items.map((item) => (
              <SearchResultsAlbum album={item} play={play} />
            ))}
          </div>
          <h2>Artists</h2>
          <hr />
          <div className="searchResults_artists">
            {search_results?.artists?.items.map((item) => (
              <p>{item.name}</p>
            ))}
          </div> */}
          <h2>Playlists</h2>
          <hr />
          <div className="searchResults_playlists">
            {search_results?.playlists?.items.map((item) => (
              <SearchResultsPlaylist playlist={item} play={play} />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="body">
      <Header spotify={spotify} />
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
          <div className="numLikes">
            <FavoriteIcon className="likes" fontSize="small" />
            <p>{selected_playlist?.followers.total}</p>
          </div>
        </div>
      </div>

      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledIcon
            className="body_shuffle body_green"
            onClick={handleClickPlaylist}
          />
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
