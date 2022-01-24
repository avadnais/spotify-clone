import React from 'react';
import './SearchResult.css'

function SearchResult({track}) {
  return (
    <div className='searchResult'>
        <img src={track.album.images[0].url} alt="" />
        <p>{track.name}</p>
    </div>
      )
}

export default SearchResult;
