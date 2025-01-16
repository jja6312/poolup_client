import React from 'react';

const Card = ({id,type,content}) => {
    return (
        <div id={id} type={type} className="flex justify-center items-center h-[90px] bg-white rounded-lg text-sm">
            {content}
        </div>
    );
};

export default Card;