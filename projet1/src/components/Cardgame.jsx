import React from 'react';

function Card({ number, visible, pairFound, onClick }) {
  console.log('Card rendered with props:', { number, visible, onClick });

  // Afficher le contenu différent lorsque la carte est visible
  const cardContent = visible ? `You found ${number}!` : '?';

  return (
    <div
      className={`card ${visible || pairFound ? 'visible' : ''}`}
      onClick={onClick}
    >
      <div className='card-inner'>
        {/* Style du card-front */}
        <div className='card-front'>{visible ? '?' : cardContent}</div>
        {/* Style du card-back */}
        <div className='card-back'>{visible ? cardContent : '?'}</div>
      </div>
    </div>
  );
}

export default Card;
