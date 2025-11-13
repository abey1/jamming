let userAccessToken = "";
const stateKey = "spotify_auth_state";

// Utility function to generate a random string for state
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const Spotify = {
  scope: "playlist-modify-public playlist-modify-private",
  clientId: "88a6808246d94fe29f93e2ac444280e6",
  redirectUri: "http://127.0.0.1:8888/callback",
  getAccessToken_copy() {
    // Return the token if we already have it
    if (userAccessToken) {
      return userAccessToken;
    }
    // Check if token is in URL hash
    const hash = window.location.hash;
    if (hash) {
      const tokenMatch = hash.match(/access_token=([^&]*)/);
      const expiresMatch = hash.match(/expires_in=([^&]*)/);
      const stateMatch = hash.match(/state=([^&]*)/);
      const error = hash.match(/error=([^&]*)/);

      if (error) {
        console.log(error);
      }

      const storedState = localStorage.getItem(stateKey);
      // the tokenMatch checks if an access_token exists in the URL hash.
      // the expiresMath checks if the URL contains the expiration time.
      // stateMatch checks if the URL contains the state parameter Spotify sent back.
      // stateMatch[1] is the actual state we sent to spotify ,we checking if it matches with the one stored in localstorage

      // important------------------------------------
      //    stateMatch &&
      // stateMatch[1] === storedState
      // the above two were optional now removed because the token is comming rom backend
      if (tokenMatch && expiresMatch) {
        console.log(`token match and expires match found`);
        //setting the access token
        // userAccessToken = tokenMatch[1];

        //the token expires in
        const expiresIn = Number(expiresMatch[1]);

        // Clear token after it expires
        window.setTimeout(() => (userAccessToken = ""), expiresIn * 1000);

        // Clean/clean the URL
        window.history.pushState("Access Token", null, "/");

        // Remove state from localStorage
        localStorage.removeItem(stateKey);

        return userAccessToken;
      } else {
        console.error("State mismatch or missing token in URL.");
      }
    }
    // If no token, redirect user to Spotify authorization
    console.log("sending user to the spotify login page");
    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);

    // const loginUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
    //   this.clientId
    // )}&scope=${encodeURIComponent(
    //   this.scope
    // )}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;

    let authUrl = "https://accounts.spotify.com/authorize";
    authUrl += "?response_type=code";
    authUrl += "&client_id=" + encodeURIComponent(this.clientId);
    authUrl += "&scope=" + encodeURIComponent(this.scope);
    authUrl += "&redirect_uri=" + encodeURIComponent(this.redirectUri);
    authUrl += "&state=" + encodeURIComponent(state);
    // encodeURIComponent(this.clientId);
    window.location.href = authUrl;
  },
  getAccessToken() {
    // Return the token if we already have it
    const access_token = localStorage.getItem("spotify_access_token");
    if (access_token) {
      return access_token;
    } else {
      //get state
      const state = generateRandomString(16);
      let authUrl = "https://accounts.spotify.com/authorize";
      authUrl += "?response_type=code";
      authUrl += "&client_id=" + encodeURIComponent(this.clientId);
      authUrl += "&scope=" + encodeURIComponent(this.scope);
      authUrl += "&redirect_uri=" + encodeURIComponent(this.redirectUri);
      authUrl += "&state=" + encodeURIComponent(state);

      window.location.href = authUrl;
    }
  },

  search(searchTerm) {
    const accessToken = this.getAccessToken();
    console.log(`access token ================ ${accessToken}`);
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Spotify search failed");
          }
          return response.json();
        })
        .then((data) => {
          if (!data.tracks) {
            // if no truacks in data return empty list
            resolve([]);
          } else {
            const tracks = data.tracks.map((track) => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
              };
            });
            resolve(tracks);
          }
        })
        .catch((error) => {
          console.log(`Spotify error: ${error}`);
          resolve([]);
        });
    });
  },
};

export default Spotify;
