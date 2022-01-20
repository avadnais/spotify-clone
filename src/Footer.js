import React, { useEffect } from "react";
import "./Footer.css";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Grid, Slider } from "@mui/material";
import { VolumeDown } from "@mui/icons-material";
import { useDataLayerValue } from "./DataLayer";

function Footer({ spotify }) {
  const [{ volume, track, playing }, dispatch] = useDataLayerValue();
  useEffect(() => {
    console.log(`%cFOOTER RENDERED`, `color: yellow`);
    const getStartingState = async() => await spotify.getMyCurrentPlaybackState().then((response) => {
      dispatch({
        type: "SET_SELECTED_TRACK",
        track: response.item.track,
      });
      if (!playing) {
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      }
    });
    getStartingState();
  }, [spotify, dispatch]);

  useEffect(() => {
    console.log(`%cFOOTER RENDERED`, `color: cyan`);
  });

  const handleChange = (e) => {
    let _volume = e.target.childNodes[0].value; //MUI Slider location of value
    dispatch({
      type: "SET_VOLUME",
      volume: _volume,
    });
    spotify.setVolume(_volume);
  };

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const handleSkipNext = () => {
    spotify.skipToNext().then(() => {
      spotify.getMyCurrentPlaybackState().then((response) => {
        dispatch({
          type: "SET_SELECTED_TRACK",
          track: response.item.track,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer">
        <div className="footer_left">
          <img
            src={track?.album.images[0].url}
            alt={track?.name}
            className="footer_albumLogo"
          />
          {track && (
            <div className="footer_songInfo">
              <h4>{track.name}</h4>
              <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="footer_center">
          <div className="footer_icons">
            <ShuffleIcon className="footer_green" />
            <SkipPreviousIcon className="footer_icon" />
            <PlayCircleOutlinedIcon
              fontSize="large"
              className="footer_icon"
              onClick={handlePlayPause}
            />
            <SkipNextIcon className="footer_icon" onClick={handleSkipNext} />
            <RepeatIcon className="footer_green" />
          </div>
        </div>

        <div className="footer_right">
          <Grid container spacing={2}>
            <Grid item>
              <PlaylistPlayIcon />
            </Grid>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                min={0}
                max={100}
                value={volume}
                step={1}
                onChangeCommitted={handleChange}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Footer;
