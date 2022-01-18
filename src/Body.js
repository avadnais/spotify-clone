import React, { useEffect } from 'react';
import './Body.css';
import { useDataLayerValue } from './DataLayer';
import Header from './Header'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';

function Body({spotify}) {

    const [{item, selected_playlist}, dispatch] = useDataLayerValue();

    const playPlaylist = (id) => {
        spotify
          .play({
            context_uri: `spotify:playlist:${id}`,
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };

      const playSong = (id) => {
        spotify
          .play({
            uris: [`spotify:track:${id}`],
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
              dispatch({
                type: "SET_ID" ,
                id: id
              });
              
            });
            
          });
      };

    return (
        <div className='body'>
            <Header />
            <div className="body_info">
                <img className="album_cover"src={selected_playlist?.images[0].url} alt="Album cover" />
                <div className="body_infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{selected_playlist?.name}</h2>
                    <p>{selected_playlist?.description}</p>
                </div>
            </div>

            <div className="body_songs">
                <div className="body_icons">
                    <PlayCircleFilledIcon className='body_shuffle body_green'/>
                    <FavoriteIcon className='body_green' fontSize='large'/>
                    <MoreHorizIcon />
                </div>
                {selected_playlist?.tracks?.items.map((item, i) => 
                    <SongRow 
                    i={i} 
                    track={item?.track} 
                    playSong={playSong}/>
                )}
            </div>
        </div> 
    )
}

export default Body
