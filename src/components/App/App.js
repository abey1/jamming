import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import React from "react";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

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
          uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6", // or something similar
        },
        {
          id: 2,
          name: "Midnight Echo",
          artist: "Lunar Waves",
          album: "City Nights",
          uri: "spotify:track:7bZfrsQ3w7Dtw3aN8pVGfJ",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  removeTrack(doomedTrack) {
    const newList = this.state.playListTracks.filter((track) => {
      return track.id !== doomedTrack.id;
    });
    this.setState({
      playListTracks: newList,
    });
  }

  updatePlaylistName(newPlaylistName) {
    this.setState({ playListName: newPlaylistName });
  }

  savePlaylist() {
    const trackUri = this.playListTracks.map((track) => track.uri);
    return trackUri;
  }

  search(searchTerm) {
    this.searchResults = Spotify.search(searchTerm);
    console.log(`search results: ${this.searchResults}`);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
            />
            {/* Add a Playlist component */}
            <Playlist
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
