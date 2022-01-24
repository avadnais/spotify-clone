import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import {Avatar} from "@mui/material";
import {useDataLayerValue} from './DataLayer';
import SearchResult from './SearchResult';

function Header({spotify}) {

    const [{ user }] = useDataLayerValue();
    const [searchResults, setSearchResults] = useState([])

/*     const handleChange = (e) => {
        
         spotify.searchTracks(e.target.value).then((r) => {
         console.log(r)
         setSearchResults(r.tracks.items)
        }) 
    } */

    return (
        <div className='header'>
            <div className="header_left">
                <SearchIcon />
                <input 
                placeholder="Search for artists, songs, or podcasts" 
                type="text"
                /* onChange={handleChange} */ />
            </div>

{/*             {searchResults && (
                <div>
                    {searchResults?.map((res, i) => (<SearchResult key={i} track={res} />))}
                </div>
                )} */}

            <div className="header_right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name}/>
                <h4>{user?.display_name}</h4>
            </div>
            
            
        </div>
    )
}

export default Header
