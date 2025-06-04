import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './components/Home';
import MusicApp from './components/MusicApp';
import Favorites from './components/Favourites';
import { playlists, tracksByPlaylist } from './components/data';

export default function App() {
  
  const [favorites, setFavorites] = useState(new Set());

  
  const toggleFavorite = (trackId) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) newSet.delete(trackId);
      else newSet.add(trackId);
      return newSet;
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              playlists={playlists}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <MusicApp
              playlists={playlists}
              tracksByPlaylist={tracksByPlaylist}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              allTracks={Object.values(tracksByPlaylist).flat()}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </Router>
  );
}
