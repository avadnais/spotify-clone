import React, { useEffect } from "react";
import "./App.css";
import { Login } from "./Login";
import { getTokenFromURL } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { Dashboard } from "./Dashboard";
import { useDataLayerValue } from "./DataLayer";
import { getSpotifyLinkTitle } from "react-spotify-web-playback/lib/utils";

const spotify = new SpotifyWebApi();

export const App = () => {
  const [{ user, token, volume }, dispatch] = useDataLayerValue();


  // run code based on given condition (blank second param = run only once)
  useEffect(() => {
    const _token = getTokenFromURL().access_token;
    window.history.pushState({}, null, "/"); //clear the url after the hash

    if(_token) spotify.setAccessToken(_token);

    dispatch({
      type: 'SET_TOKEN',
      token: _token
    })

    spotify.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });

    //set first device in list to active and get volume
    spotify.getMyDevices().then((r) => {
      dispatch({
        type: 'SET_VOLUME',
        volume: r.devices[0].volume_percent
      })
      dispatch({
        type: 'SET_DEVICE',
        device_id: r.devices[0].id
      })
      spotify.transferMyPlayback([r.devices[0].id], {
        'is_active': 'true'
      })
    })

    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlists,
      });
    });

    spotify.getPlaylist("37i9dQZEVXcTqK7wcVg7Co").then((response) => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      });
    });
  }, []);

  return (
    <div className="app">
      {token ? <Dashboard spotify={spotify}/> : <Login />}
    </div>
  );
};

export default App;
