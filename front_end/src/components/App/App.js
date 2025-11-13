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

  componentDidMount() {
    // When the app first loads, check the URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (token) {
      // Save to localStorage for global access
      localStorage.setItem("spotify_access_token", token);
      localStorage.setItem("spotify_expires_in", expiresIn);

      // Store in component state too
      this.setState({ accessToken: token, expiresIn });

      // Clean up the URL
      window.history.replaceState(null, "", window.location.pathname);

      // Set timeout to clear token when it expires
      setTimeout(() => {
        localStorage.removeItem("spotify_access_token");
        localStorage.removeItem("spotify_expires_in");
        this.setState({ accessToken: null });
      }, expiresIn * 1000);
    } else {
      // If not in URL, try to get it from localStorage
      const storedToken = localStorage.getItem("spotify_access_token");
      const storedExpires = localStorage.getItem("spotify_expires_in");
      if (storedToken) {
        this.setState({ accessToken: storedToken, expiresIn: storedExpires });
      }
    }
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
    console.log("before search results");
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
