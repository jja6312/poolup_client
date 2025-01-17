import React, { useState } from 'react';
import Card from './Card';

const GameScreen = () => {
  const [point1P, setPoint1P] = useState(0);
  const [point2P, setPoint2P] = useState(0);
    return (
        <div className="flex justify-center bg-[#EDF0FF] w-[100vw] h-[100vh] gap-10 p-5">
    {/* 좌측 보라색 박스 */}
    <div className="bg-[#A1A7FF] w-[60%] rounded-xl grid grid-cols-3 gap-2 p-2">
      <Card
        id="1" 
        type="answer" 
        content="스레드야스레드" />
     
    </div>
    
    {/* 우측 흰색 박스의 컨테이너 */}
    <div className="flex flex-col w-[40%] h-[100%] gap-5">
    {/* 우측 상단, 클릭을 통한 임시 로그인 */}
    {/* <div className="flex w-full h-20 gap-2">
      <span className="flex justify-center items-center w-1/2 rounded-lg bg-gray-400
      cursor-pointer transition-all duration-200
      hover:opacity-70"
      >1p로그인</span>
      <span className="flex justify-center items-center w-1/2 rounded-lg bg-gray-400 
      cursor-pointer transition-all duration-200
      hover:opacity-70" >2p로그인</span>
    </div> */}
    
      {/* 우측 흰색 박스 1 */}
    <div className="flex flex-col bg-white w-full h-full p-5 rounded-xl">
      <span className="text-2xl font-bold">2P(플레이어 이름)</span>
      {/* 점수표(1P) */}
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-red-500 text-6xl font-bold">{point1P}</span>
      </div>
    </div>
    {/* 우측 흰색 박스 2 */}
    <div className="flex flex-col bg-white w-full h-full p-5 rounded-xl">
    <span className="text-2xl font-bold">1P(플레이어 이름)</span>
    {/* 점수표(2P) */}
    <div className="w-full h-full flex justify-center items-center">
        <span className="text-red-500 text-6xl font-bold">{point2P}</span>
      </div>
    </div>
    </div>
  </div>
    );
};

export default GameScreen;