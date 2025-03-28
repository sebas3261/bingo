import React from 'react';
import './Won.css';

export default function Won() {
  return (
    <div className="wonContainer">
      <div className="confettiContainer">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`confetti confetti-${i % 5}`}></div>
        ))}
      </div>
      
      <div className="wonCard">
        <div className="wonBadge">
          <div className="wonBadgeInner">
            <span className="wonStar">★</span>
          </div>
        </div>
        
        <h1 className="wonTitle">¡Felicidades!</h1>
        <h2 className="wonSubtitle">¡Has ganado el Bingo Biológico!</h2>
        
        <div className="wonMessage">
          <p>Has demostrado un excelente conocimiento de los términos biológicos.</p>
          <p>¡Sigue aprendiendo y divirtiéndote!</p>
        </div>
        
        <button className="wonButton" onClick={() => window.location.href = '/game'}>
          Jugar de nuevo
        </button>
      </div>
      
      <div className="decorationLeaves">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
        <div className="leaf leaf4"></div>
      </div>
    </div>
  );
}