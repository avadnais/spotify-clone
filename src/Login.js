import React from "react";
import "./Login.css";
import { tokenURL } from "./spotify";

export const Login = () => {
    return (
        <div className="login">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="logo"></img>
            <a href={tokenURL}>Login with Spotify</a>
        </div>
    )
}