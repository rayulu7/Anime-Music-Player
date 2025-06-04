import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home({ playlists, favorites, toggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Choose Your Playlist</h1>
      <div className="playlist-grid">
        {[...playlists].map(pl => (
          <div
            key={pl.id}
            className="playlist-card"
            onClick={() => navigate(`/playlist/${pl.id}`)}
          >
            <img src={pl.cover} alt={pl.name} />
            <h3>{pl.name}</h3>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/favorites')}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        View Favorites ({favorites.size})
      </button>
    </div>
  );
}
