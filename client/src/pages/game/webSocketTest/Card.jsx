import React from 'react';

const Card = ({ id, type, content, problemNumber, disabled, onClick }) => {
  return (
    <div
      id={id}
      className={`flex justify-center items-center h-[90px] bg-white rounded-lg text-sm cursor-pointer
        transition-all duration-200 hover:scale-105 ${disabled ? 'opacity-0 pointer-events-none' : ''}`}
      onClick={() => !disabled && onClick(problemNumber, type)}
    >
      <span className="text-center">{content}</span>
    </div>
  );
};

export default Card;
