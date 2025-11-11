import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack = () => {
    this.props.onAdd(this.props.track);
  };
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {this.props.track.name}
            {/* track name will go here  */}
          </h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
            {/* track artist will go here--> | <!-- track album will go here  */}
          </p>
        </div>
        <button className="Track-action">
          {/* + or - will go here  */}
          {this.props.isRemoval ? "-" : "+"}
        </button>
      </div>
    );
  }
}

export default Track;
