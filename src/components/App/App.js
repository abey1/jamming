import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import React from "react";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: "My Playlist",
      playListTracks: [
        {
          id: 1,
          name: "Endless Skies",
          artist: "Nova Pulse",
          album: "Dream Horizons",
        },
        {
          id: 2,
          name: "Midnight Echo",
          artist: "Lunar Waves",
          album: "City Nights",
        },
        {
          id: 3,
          name: "Electric Bloom",
          artist: "Solar Echo",
          album: "Neon Garden",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(newTrack) {
    const trackExists = this.state.playListTracks.some(
      (track) => track.id === newTrack.id
    );
    if (!trackExists) {
      this.setState((prevState) => {
        return { playlistTracks: [...prevState.playListTracks, newTrack] };
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <SearchBar />
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            {/* Add a Playlist component */}
            <Playlist
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
