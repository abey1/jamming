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
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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
    this.setState((prevState) => {
      return {
        playListTracks: newList,
      };
    });
  }

  updatePlaylistName(newPlaylistName) {
    this.setState((prevState) => {
      return { playListName: newPlaylistName };
    });
  }

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  });

  return await response.json();
}
  savePlaylist (){

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
              onRemove={this.removeTrack}
            />
            {/* Add a Playlist component */}
            <Playlist
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
