import React, { useEffect } from "react";
import "./Footer.css";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Grid, Slider } from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { Pause, VolumeDown } from "@mui/icons-material";
import { useDataLayerValue } from "./DataLayer";

function Footer({ spotify }) {
  const [{ volume, track, playing, selected_playlist, index }, dispatch] =
    useDataLayerValue();
  useEffect(() => {
    let mounted = true;
    console.log(`%cFOOTER RENDERED`, `color: yellow`);
    const getStartingState = async () =>
      await spotify.getMyCurrentPlaybackState().then((response) => {
        try {
          console.log(`%cgetmyCurrentPlaybackState():`, `color:yellow`);
          console.log(response);
          dispatch({
            type: "SET_SELECTED_TRACK",
            track: response.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: response.item.is_playing,
          });
        } catch (e) {
          console.log(e);
        }
      });

    getStartingState();
    console.log(`%cTRACK:${track}`, `color: yellow`);
  }, [spotify, dispatch]);

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
    // can't skip on last song of playlist
    if (index === selected_playlist.tracks.items.length - 1) {
      console.log("end of playlist reached");
    } else {
      spotify.skipToNext();
      dispatch({
        type: "SET_SELECTED_TRACK",
        track: selected_playlist.tracks.items[index + 1].track,
      });
      dispatch({
        type: "SET_INDEX",
        index: index + 1,
      });
    }
  };

  const handleSkipBack = () => {
    // can't skip back on first song of playlist
    if (index === 0) {
      console.log("can't skip back on first song of playlist");
    } else {
      spotify.skipToPrevious();
      dispatch({
        type: "SET_SELECTED_TRACK",
        track: selected_playlist.tracks.items[index - 1].track,
      });
      dispatch({
        type: "SET_INDEX",
        index: index - 1,
      });
    }
  };

  return (
    <div className="footer">
      <div className="footer">
        <div className="footer_left">
          <img
            src={track?.album?.images[0]?.url}
            alt={track?.name}
            className="footer_albumLogo"
          />
          {track && (
            <div className="footer_songInfo">
              <h4>{track.name}</h4>
              <p>{track?.artists?.map((artist) => artist.name).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="footer_center">
          <div className="footer_icons">
            <ShuffleIcon className="footer_green" />
            <SkipPreviousIcon className="footer_icon" onClick={handleSkipBack} />
            {playing ? (
              <PauseCircleOutlineIcon
                fontSize="large"
                className="footer_icon"
                onClick={handlePlayPause}
              />
            ) : (
              <PlayCircleOutlinedIcon
                fontSize="large"
                className="footer_icon"
                onClick={handlePlayPause}
              />
            )}
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
