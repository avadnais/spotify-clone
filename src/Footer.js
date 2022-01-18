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

function Footer({spotify}) {
  const [{ device_id, volume, item, playing}, dispatch] = useDataLayerValue();
  const INTERVAL = 250;
  let timer;
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((response) => {
    
      dispatch({
        type: "SET_ITEM",
        action: response.item,
      });

      dispatch({
        type: "SET_PLAYING",
        action: response.is_playing,
      });
    });
  }, [spotify]);

  const handleChange = (e) => {
    console.log(e)
    console.log(e.target)
    let _volume = e.target.childNodes[0].value //MUI Slider location of value
    dispatch({
      type: 'SET_VOLUME',
      volume: _volume
    })
    spotify.setVolume(_volume)
  }
    

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
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((response) => {
      dispatch({
        type: "SET_ITEM",
        item: response.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer_left">
        <img
          src={item?.album.images[0].url}
          alt={item?.name}
          className="footer_albumLogo"
        />
        {item ? (
          <div className="footer_songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ) : (
          <div className="footer_songInfo">
            <h4>No song selected</h4>
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
  );
}

export default Footer;
