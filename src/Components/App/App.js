import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import { Spotify } from "../../util/Spotify/Spotify";
import Footer from "../Footer/Footer";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Track Name 1",
      artist: "Example Track Artist 1",
      album: "Example Track Album 1",
      id: 1,
    },
    {
      name: "Example Track Name 2",
      artist: "Example Track Artist 2",
      album: "Example Track Album 2",
      id: 2,
    },
    ]);
  const [playlistName, setPlaylistName] = useState("Name Your Playlist Here");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Album 1",
      id: 1,
    },
    {
      name: "Example Playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Album 2",
       id: 2,
    },
    {
      name: "Example Playlist Name 3",
      artist: "Example Playlist Artist 3",
      album: "Example Playlist Album 3",
      id: 3,
    },
  ]);

    function addTrack(track) {
      const existingTrack = playlistTracks.find((t) => t.id === track.id);
      const newTrack = playlistTracks.concat(track);
      if (existingTrack) {
        console.log("Track already exists");
      } else {
        setPlaylistTracks(newTrack);
      }
    }

    function removeTrack(track) {
      const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
      setPlaylistTracks(existingTrack);
    }

    function updatePlaylistName(name) {
      setPlaylistName(name);
    }

    function savePlaylist() {
      const trackURIs = playlistTracks.map((t) => t.uri);
      Spotify.savePlaylist(playlistName, trackURIs).then(() => {
        updatePlaylistName("Name Your Playlist Here");
        setPlaylistTracks([]);
      });
    }

    function search(term) {
      Spotify.search(term).then(result => setSearchResults(result));
      console.log(term);
    }

    return (
        <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing
        </h1>
        <p className={styles.theme}>Find Your Music | Name & Build Your Playlist | Save Your Playlist</p>
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={search} />

          <div className={styles['App-playlist']}>
              <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
            
            {/* <!-- Add a SearchResults component --> */}
            
            {/* <!-- Add a Playlist component --> */}
              <Playlist 
                playlistName={playlistName} 
                playlistTracks={playlistTracks}
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
                onSave={savePlaylist}
              />
          </div>
        </div>
        <Footer />
      </div>
        );
}

export default App;