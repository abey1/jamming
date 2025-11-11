import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
const Playlist = ({ playListName, playListTracks }) => {
  return (
    <div className="Playlist">
      <input value={"New Playlist"} />
      {/* Add a TrackList component */}
      <TrackList playList={playListTracks} />
      {/* <TrackList /> */}
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};

export default Playlist;
