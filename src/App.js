import React, { useEffect } from "react";
import "./App.css";
import { Login } from "./Login";
import { getTokenFromURL } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { Dashboard } from "./Dashboard";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

export const App = () => {
  const [{ token }, dispatch] = useDataLayerValue();

  // run code based on given condition (blank second param = run only once)
  useEffect(() => {
    const _token = getTokenFromURL().access_token;
    window.history.pushState({}, null, "/"); //clear the url after the hash

    if (_token) spotify.setAccessToken(_token);

    dispatch({
      type: "SET_TOKEN",
      token: _token,
    });

    spotify.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });

    //set first device in list to active and get volume
 /*    const fetchDevices = async () => {
      await spotify.getMyDevices().then((r) => {
        dispatch({
          type: "SET_VOLUME",
          volume: r.devices[0].volume_percent,
        });
        dispatch({
          type: "SET_DEVICE",
          device_id: r.devices[0].id,
        });
        spotify.transferMyPlayback([r.devices[0].id], {
          is_active: "true",
        });
      });
    }; */
/* 
    console.log(`%cABOUT TO REQUEST CURRENT PLAYING TRACK IN APP.JS`, `color: red; font-weight: bold`)
    spotify.getMyCurrentPlayingTrack().then((response) => {
      console.log("Currently playing 🎵", response.item.id);
      dispatch({
        type: "SET_SELECTED_TRACK",
        current_track: response.id,
      });
      console.log(response);
      dispatch({
        type: "SET_PLAYING",
        playing: response.is_playing,
      });
    }); */
  }, [dispatch]);

  return (
    <div className="app">
      {token ? <Dashboard spotify={spotify} /> : <Login />}
    </div>
  );
};

export default App;
