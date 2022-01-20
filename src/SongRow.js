import React from "react";
import "./SongRow.css";
import { useDataLayerValue } from "./DataLayer";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

function SongRow({ item, playSong, i }) {
  const _track = item.track;

  const handleClick = () => {
    playSong(item);
  };

  const [{ track }] = useDataLayerValue();

  return (
    <div id={_track.id} className="songRow" onClick={handleClick}>
      <div
        className="songRow_index_container"
        id={"index_container_" + _track.id}
      >
        {_track.id === track?.id ? (
            <div className="songRow_audioWave" id="songRow_audioWave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
        ) : (
          <h4 className="songRow_index">{i + 1}</h4>
        )}
      </div>

      <img className="songRow_album" src={_track.album.images[0].url} alt="" />
      <div className="songRow_info">
        <h1>{_track.name}</h1>
        <p>
          {_track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {_track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
