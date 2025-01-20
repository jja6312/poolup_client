import React, { useState } from 'react';
import { createRoom } from './api/createRoom';
import useWebSocket from './webSocket/useWebSocket';

const GameInviteOrParticipation = ({ isGameStart, setIsGameStart, member, setRoomStatus, setPlayers }) => {
  const [roomId, setRoomId] = useState('');
  const [inviteCodeForParticipation, setInviteCodeForParticipation] = useState('');

  const { sendMessage } = useWebSocket();

  const handleCreateRoom = async () => {
    try {
      const response = await createRoom(member.id);
      setRoomId(response.roomId);
      setRoomStatus(response.roomStatus);
      setIsGameStart(true);
      setPlayers((prevPlayer) => ({ ...prevPlayer, player1P: response.player1P }));

      console.log('방생성시 웹소켓에 전달되는 정보', response.roomId, member.id, member.name);

      // WebSocket 메시지 전송 대기
      await sendMessage('/app/room/create', {
        roomId: response.roomId,
        playerId: member.id,
      });
    } catch (error) {
      alert('초대코드 생성 실패 또는 WebSocket 전송 실패');
      console.error(error);
    }
  };

  const handleJoinRoom = () => {
    sendMessage('/app/room/join', {
      roomId: inviteCodeForParticipation,
      playerId: member.id,
    });

    // 상태 업데이트
    setRoomStatus('START');
    setIsGameStart(true);
    setPlayers((prevPlayer) => ({
      ...prevPlayer,
      player2P: {
        memberId: member.id,
        name: member.name,
      },
    }));
  };

  // 초대코드 인풋값 변경감지지
  const handleInputChange = (e) => {
    setInviteCodeForParticipation(e.target.value);
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center gap-5">
      <span className="text-2xl font-bold">초대링크 생성 or 입장</span>
      <hr className="w-5/6"></hr>
      <div className="flex flex-col justify-center items-center">
        <button
          className="w-60 h-16 bg-purple-600 rounded text-white transition-all duration-200 hover:opacity-70"
          onClick={handleCreateRoom}
        >
          초대링크 생성
        </button>

        <span className="text-gray-500">(1p는 초대코드 생성. 2p는 1p의 콘솔로그에 있는 초대코드 복붙 입장)</span>
      </div>

      <div className="flex">
        <input
          className="border-2 border-gray-200 rounded p-2 w-60"
          name="inviteCode"
          value={inviteCodeForParticipation}
          onChange={handleInputChange}
          placeholder="초대코드로 입장하기"
        ></input>
        <button
          className="bg-purple-200 w-20 h-16
            transition-all duration-200 hover:opacity-70
            "
          onClick={handleJoinRoom}
        >
          입장
        </button>
      </div>
    </div>
  );
};

export default GameInviteOrParticipation;
