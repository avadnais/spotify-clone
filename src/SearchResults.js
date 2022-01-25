import React, {useState} from "react";
import "./SearchResults.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useDataLayerValue } from "./DataLayer";



function SearchResultsTrack({ track, play }) {

    const [open, setOpen] = useState(false)
    const [{playlists}] = useDataLayerValue();

  const handleClick = () => {
    play(track, 'track', track.id);
  };
  
  const handlePlusClick = () => {
    setOpen(!open)
  }

  const handlePlusClose = () => {
    
  }

  return (
    <div id={track.id} className="searchResult_song"  >
        <AddCircleOutlineIcon className="searchResult_song_icon" onClick={handlePlusClick}/>
        <Modal
        open={open}
        onClose={handlePlusClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalBox">
          <h3>Add {track.name} to...</h3>
            {playlists.items.map((playlist) => (<p>{playlist.name}</p>))}
        </Box>
      </Modal>
      <img className="searchResult_song_album" src={track.album.images[0].url} alt="" />
      <div className="searchResult_song_info" onClick={handleClick}>
        <p>
        <strong>{track.name}</strong> {" - "}
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

function SearchResultsAlbum({ album, play }) {
  //console.log(`item in SearchResultAlbum: `, album);

  const handleClick = () => {
    play(album, "album", album.id);
  };
  return (
    <div id={album.id} className="searchResults_album" onClick={handleClick}>
      <img
        className="searchResults_album_albumImg"
        src={album.images[0].url}
        alt=""
      />
      <div className="searchResults_album_info">
        <h1>{album.name}</h1>
        <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
    </div>
  );
}

function SearchResultsPlaylist({ playlist, play }) {
  const handleClick = () => {
    play(playlist, "playlist", playlist.id);
  };

  return (
    <div
      id={playlist.id}
      className="searchResults_playlist"
      onClick={handleClick}
    >

        <img
        className="searchResults_playlist_img"
        src={playlist.images[0]? playlist.images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'}
        alt=""
      />
      <h3>{playlist.name}</h3>

    </div>
  );
}

function SearchResultsArtist({ artist }) {
  return (
    <div
      id={artist.id}
      className="searchResults_artist" /* onClick={handleClick} */
    ></div>
  );
}

export {
  SearchResultsTrack,
  SearchResultsAlbum,
  SearchResultsPlaylist,
  SearchResultsArtist,
};
