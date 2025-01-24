import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getTemporaryProblems } from './api/getTemporaryProblems';
import useWebSocket from './webSocket/useWebSocket';

const GameScreen = ({ roomStatus, roomInfo, member }) => {
  const { sendMessage } = useWebSocket();
  const [problems, setProblems] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]); // 선택된 카드 저장

  // 카드 클릭시 정답처리하는함수.
  const handleCardClick = (problemNumber, type) => {
    if (roomInfo.disabledCards.includes(problemNumber)) return; // 이미 비활성화된 카드라면 무시

    const selectedCardsToCorrectCheck = [...selectedCards, { problemNumber, type }]; // 선택된 카드가 정답인지 판별하기 위한 배열.

    if (selectedCardsToCorrectCheck.length === 2) {
      // 카드가 두 개 선택되었을 때
      if (selectedCardsToCorrectCheck[0].problemNumber === selectedCardsToCorrectCheck[1].problemNumber) {
        //만약 두 개의 카드가 가진 problemNumber(서버측 problem의 id)가 서로 같다면 정답 처리
        // 정답 처리
        sendMessage('/app/card/submit', {
          roomId: roomInfo.roomId,
          playerId: member.memberId, // 현재 플레이어 ID
          problemNumber: selectedCardsToCorrectCheck[0].problemNumber,
        });
      }

      // 배열 초기화
      setSelectedCards([]);
    } else {
      setSelectedCards(selectedCardsToCorrectCheck);
    }
  };

  // 방 상태가 READY(2명의 플레이어가 모두 들어온 상태)일 때, 문제카드들을 가져온다.
  useEffect(() => {
    console.log('************roomStatus ', roomStatus);
    if (roomStatus === 'READY') {
      // 문제 카드들 가져오기
      const fetchProblems = async () => {
        try {
          const response = await getTemporaryProblems();
          console.log('problems', response.problemCards);
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
        {problems.map((problem, index) => [
          <Card
            key={`question-${problem.id}`} // 고유 key
            id={`question-${index}`} // ID 설정
            type="question"
            content={problem.question}
            problemNumber={problem.id}
            disabled={roomInfo.disabledCards.includes(problem.id)} // 비활성화 여부
            onClick={handleCardClick} // 클릭 이벤트 핸들러 전달
          />,
          <Card
            key={`answer-${problem.id}`} // 고유 key
            id={`answer-${index}`} // ID 설정
            type="answer"
            content={problem.answer}
            problemNumber={problem.id}
            disabled={roomInfo.disabledCards.includes(problem.id)} // 비활성화 여부
            onClick={handleCardClick} // 클릭 이벤트 핸들러 전달
          />,
        ])}
      </div>

      {/* 우측 흰색 박스의 컨테이너 */}
      <div className="flex flex-col w-[40%] h-[100%] gap-5">
        {/* 우측 흰색 박스 1 */}
        <div className="flex flex-col bg-white w-full h-full p-5 rounded-xl">
          <span className="text-2xl font-bold">1P</span>
          <span className="text-2xl font-bold text-blue-500">{roomInfo.player1P.name}</span>

          {/* 점수표(1P) */}
          <div className="w-full h-full flex justify-center items-center">
            <span className="text-red-500 text-6xl font-bold">{roomInfo.player1P.score}</span>
          </div>
        </div>
        {/* 우측 흰색 박스 2 */}
        <div className="flex flex-col bg-white w-full h-full p-5 rounded-xl">
          <span className="text-2xl font-bold">2P</span>
          <span className="text-2xl font-bold text-blue-500">{roomInfo.player2P.name}</span>
          {/* 점수표(2P) */}
          <div className="w-full h-full flex justify-center items-center">
            <span className="text-red-500 text-6xl font-bold">{roomInfo.player2P.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
