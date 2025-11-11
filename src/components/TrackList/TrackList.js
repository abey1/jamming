import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

const TrackList = ({ playList, isRemoval, onAdd }) => {
  return (
    <div className="TrackList">
      {/* You will add a map method that renders a set of Track components */}
      {playList.map((track) => {
        return <Track key={track.id} track={track} onAdd={onAdd} />;
      })}
    </div>
  );
};

export default TrackList;
