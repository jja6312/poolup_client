import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getTemporaryProblems } from './api/getTemporaryProblems';

const GameScreen = ({ roomStatus, roomInfo }) => {
  const [point1P, setPoint1P] = useState(0);
  const [point2P, setPoint2P] = useState(0);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    console.log('************roomStatus ', roomStatus);
    if (roomStatus === 'READY') {
      // 비동기 함수 정의 및 호출
      const fetchProblems = async () => {
        try {
          const response = await getTemporaryProblems();
          console.log('problems', response);
          setProblems(response.problemCards); // 상태로 저장
        } catch (error) {
          console.error('문제 가져오기 실패:', error);
        }
      };

      fetchProblems();
    }
  }, [roomStatus]);
  return (
    <div className="relative flex justify-center bg-[#EDF0FF] w-[100vw] h-[100vh] gap-10 p-5">
      {roomStatus === 'WAITING' && (
        <div
          className="absolute w-full h-full bg-black opacity-30 text-white flex justify-center items-center
      -translate-y-5 text-5xl
      "
        >
          🎮참가자 대기중입니다... 잠시만 기다려 주세요🎮
        </div>
      )}
      {/* 좌측 보라색 박스 */}
      <div className="bg-[#A1A7FF] w-[60%] rounded-xl grid grid-cols-3 gap-2 p-2">
        <Card id="1" type="answer" content="스레드야스레드" />
      </div>

      {/* 우측 흰색 박스의 컨테이너 */}
      <div className="flex flex-col w-[40%] h-[100%] gap-5">
        {/* 우측 흰색 박스 1 */}
        <div className="flex flex-col bg-white w-full h-full p-5 rounded-xl">
          <span className="text-2xl font-bold">1P</span>
          <span className="text-2xl font-bold text-blue-500">{roomInfo.player1P.name}</span>

          {/* 점수표(1P) */}
          <div className="w-full h-full flex justify-center items-center">
            <span className="text-red-500 text-6xl font-bold">{point1P}</span>
          </div>
        </div>
        {/* 우측 흰색 박스 2 */}
        <div className="flex flex-col bg-white w-full h-full p-5 rounded-xl">
          <span className="text-2xl font-bold">2P</span>
          <span className="text-2xl font-bold text-blue-500">{roomInfo.player2P.name}</span>
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
