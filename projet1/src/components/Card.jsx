import React from 'react';

function Card({ number, visible, onClick }) {
  return (
    <div className='card' onClick={onClick}>
      <div className={`card-inner ${visible ? 'visible' : ''}`}>
        <div className='card-front'>{visible ? number : '?'}</div>
        <div className='card-back'>{visible ? number : '?'}</div>
      </div>
    </div>
  );
}

export default Card;
