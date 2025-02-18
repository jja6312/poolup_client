import React, { useState } from 'react';
import { createRoom } from './api/createRoom';
import useWebSocket from './webSocket/useWebSocket';

const GameInviteOrParticipation = ({ setIsGameStart, member, setRoomInfo }) => {
  const [inviteCodeForParticipation, setInviteCodeForParticipation] = useState('');

  const { sendMessage } = useWebSocket();

  const handleCreateRoom = async () => {
    try {
      const response = await createRoom(member.memberId);

      setIsGameStart(true);
      setRoomInfo((prevRoomInfo) => ({ ...prevRoomInfo, roomId: response.roomId, player1P: response.player1P }));

      console.log('handleCreateRoom() 호출', response.roomId, member.memberId, member.name);
    } catch (error) {
      alert('방생성 실패');
      console.error(error);
    }
  };

  const handleJoinRoom = () => {
    console.log('메시지 전송 시작...');
    sendMessage('/app/room/join', {
      roomId: inviteCodeForParticipation,
      playerId: member.memberId,
    });
    console.log('메시지 전송 완료.');

    setIsGameStart(true);
    setRoomInfo((prevRoomInfo) => ({
      ...prevRoomInfo,
      player2P: {
        memberId: member.memberId,
        name: member.name,
      },
    }));
  };

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
          className="bg-purple-200 w-20 h-16 transition-all duration-200 hover:opacity-70"
          onClick={handleJoinRoom}
        >
          입장
        </button>
      </div>
    </div>
  );
};

export default GameInviteOrParticipation;
