import React from 'react';

function Card({ number, visible, onClick }) {
  console.log('Card rendered with props:', { number, visible, onClick });

  // Ajouter un commentaire
  // Afficher un message différent lorsque la carte est visible
  const cardContent = visible ? `You found ${number}!` : '?';

  return (
    <div className='card' onClick={onClick}>
      <div className={`card-inner ${visible ? 'visible' : ''}`}>
        {/* Modifier le style du card-front */}
        <div
          className='card-front'
          style={{ backgroundColor: visible ? '#add8e6' : '#fff' }}
        >
          {cardContent}
        </div>
        {/* Modifier le style du card-back */}
        <div
          className='card-back'
          style={{ backgroundColor: visible ? '#add8e6' : '#fff' }}
        >
          {cardContent}
        </div>
      </div>
    </div>
  );
}

export default Card;
