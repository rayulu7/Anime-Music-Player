import React, { useEffect, useRef, useState } from 'react';

import './Favourites.css'
import { useNavigate } from 'react-router-dom';


export default function Favorites({ allTracks, favorites, toggleFavorite }) {
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const favoriteTracks = allTracks.filter(t => favorites.has(t.id));

  const togglePlay = (id) => setPlayingId(curr => (curr === id ? null : id));

  const navigate = useNavigate();


  useEffect(() => {
    if (!audioRef.current) return;
    if (!playingId) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      return;
    }
    const track = favoriteTracks.find(t => t.id === playingId);
    if (track) {
      audioRef.current.src = track.audio;
      audioRef.current.play().catch(() => {});
    }
  }, [playingId, favoriteTracks]);

  return (
    <div className="playlist-page">
      <header className="playlist-header">
        <h2 className = "favourites-heading">Favorites</h2>
        <button className="home-button" onClick={() => navigate("/")}>🏠 Home</button>

      </header>
      <div className="tracks-grid">
        {favoriteTracks.length === 0 && <p>No favorites yet.</p>}
        {favoriteTracks.map(track => (
          <div
            key={track.id}
            className={`track-item ${playingId === track.id ? 'active' : ''}`}
            onClick={() => togglePlay(track.id)}
            style={{ position: 'relative' }}
          >
            <img src={track.image} alt={track.title} />
            <p className="track-title">{track.title}</p>
            <div
              className="favorite-heart"
              onClick={e => {
                e.stopPropagation();
                toggleFavorite(track.id);
              }}
              style={{
                color: 'red',
                cursor: 'pointer',
                fontSize: 24,
                userSelect: 'none',
                position: 'absolute',
                top: 8,
                right: 8,
              }}
              title="Remove from favorites"
            >
              ♥
            </div>
          </div>
        ))}
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
