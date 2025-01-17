import React from 'react';

const Card = ({id,type,content}) => {
    return (
        <div id={id} type={type} className="flex justify-center items-center h-[90px] bg-white rounded-lg text-sm cursor-pointer
        transition-all duration-200 hover:scale-105">
            {content}
        </div>
    );
};

export default Card;