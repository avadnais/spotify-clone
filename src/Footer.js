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
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import { Pause, VolumeDown } from "@mui/icons-material";
import { useDataLayerValue } from "./DataLayer";

function Footer({ spotify }) {
  const [{ volume, track, playing, selected_playlist, index, shuffle, repeat }, dispatch] =
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
          dispatch({
            type: "SET_VOLUME",
            volume: parseInt(response.device.volume_percent),
          });
          dispatch({
            type: "SET_SHUFFLE_STATE",
            shuffle: response.shuffle_state
          })
          dispatch({
            type: "SET_REPEAT_STATE",
            repeat: response.repeat_state
          })
        } catch (e) {
          console.log(e);
        }
      });

    getStartingState();
    console.log(`%cTRACK:${track}`, `color: yellow`);
  }, [spotify, dispatch]);

  let timer;
  const handleChange = (e, val) => {
    //MUI Slider location of value
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
            type: "SET_VOLUME",
            volume: parseInt(val),
      });
      spotify.setVolume(val);
      }, 5)

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
    // Set timeout to wait for skip to next to update before calling to get the state
    
    spotify.skipToNext().then(() => {
      setTimeout(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log(r);
          dispatch({
            type: "SET_SELECTED_TRACK",
            track: r.item,
          });
          dispatch({
            type: 'SET_REPEAT_STATE',
            repeat: r.repeat_state
          })
        });
      }, 250);
    });
  };

  const handleSkipBack = () => {
    // can't skip back on first song of playlist
    spotify.skipToPrevious().then(() => {
      setTimeout(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log(r);
          dispatch({
            type: "SET_SELECTED_TRACK",
            track: r.item,
          });
          dispatch({
            type: 'SET_REPEAT_STATE',
            repeat: r.repeat_state
          })
        });
      }, 250);
    });
  };

  const handleShuffle = () => {
    spotify.setShuffle(!shuffle);
    dispatch({
      type: 'SET_SHUFFLE_STATE',
      shuffle: !shuffle 
    })
  };

  const handleRepeat = () => {
    let nextStatus;
    //console.log(`repeat: `, repeat)

    if (repeat === 'off') nextStatus = 'context'
    else if (repeat === 'context') nextStatus = 'track'
    else if (repeat === 'track') nextStatus = 'off'
    spotify.setRepeat(nextStatus)
    dispatch({
      type: 'SET_REPEAT_STATE',
      repeat: nextStatus
    })
    
  }

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
            <ShuffleIcon className={shuffle && "footer_green"} onClick={handleShuffle} />
            <SkipPreviousIcon
              className="footer_icon"
              onClick={handleSkipBack}
            />
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
            {repeat === 'off' && <RepeatIcon className="footer_icon" onClick={handleRepeat} />}
            {repeat === 'context' && <RepeatIcon className="footer_green" onClick={handleRepeat} />}
            {repeat === 'track' && <RepeatOneIcon className="footer_green" onClick={handleRepeat} />}
            
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
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Footer;
