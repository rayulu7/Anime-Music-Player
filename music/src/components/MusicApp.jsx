import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MusicApp.css';

export default function MusicApp({ playlists, tracksByPlaylist, favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const playlist = playlists.find(p => p.id === id);
  const tracks = playlist ? tracksByPlaylist[id] || [] : [];

  useEffect(() => {
    if (!audioRef.current) return;
    const track = tracks.find(t => t.id === playingId);
    if (track) {
      audioRef.current.src = track.audio;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [playingId, tracks]);

  const togglePlay = (trackId) => {
    setPlayingId(curr => (curr === trackId ? null : trackId));
  };

  if (!playlist) {
    return (
      <div className="playlist-page empty">
        Playlist not found.
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="playlist-page">
      <header className="playlist-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        {playlist.name}
      </header>

      <div className="tracks-grid">
        {tracks.map(track => (
          <div
            key={track.id}
            className={`track-item ${playingId === track.id ? 'active' : ''}`}
            onClick={() => togglePlay(track.id)}
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
                color: favorites.has(track.id) ? 'red' : 'gray',
                cursor: 'pointer',
                fontSize: 24,
                userSelect: 'none',
                position: 'absolute',
                top: 8,
                right: 8,
              }}
              title={favorites.has(track.id) ? 'Remove from favorites' : 'Add to favorites'}
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
