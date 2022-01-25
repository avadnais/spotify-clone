
/* 
step 1: click login with spotify link
step 2: redirect to spotify login page
step 3: redirect back to localhost:3000/
*/

const authEndpoint = "http://accounts.spotify.com/authorize";
const redirectURI = "https://avadnais.github.io/spotify-clone";
const clientId = process.env.REACT_APP_CLIENT_ID
const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "streaming",
];

export const getTokenFromURL = () => {
  return window.location.hash // go to # location in URL (where access token starts)
    .substring(1) //
    .split("&") //
    .reduce((initial, item) => {
      let parts = item.split("="); // split at =
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const tokenURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
