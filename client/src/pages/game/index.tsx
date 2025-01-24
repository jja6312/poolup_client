import { useEffect, useState } from 'react';
import GameLogin from './webSocketTest/GameLogin';
import GameScreen from './webSocketTest/GameScreen';
import GameInviteOrParticipation from './webSocketTest/GameInviteOrParticipation';
import useWebSocket from './webSocketTest/webSocket/useWebSocket';

const GamePage = () => {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부
  const [isGameStart, setIsGameStart] = useState(false); // 게임 시작
  const [member, setMember] = useState({
    // 로그인을 통해 set되고, 방생성시 사용되는 member
    memberId: '',
    name: '',
    email: '',
  });

  // WebSocket에서 roomStatus를 관리한다.
  const { roomStatus, roomInfo, setRoomInfo } = useWebSocket();

  // WebSocket 메시지 수신 시 상태 업데이트
  useEffect(() => {
    console.log('roomStatus', roomStatus);
  }, [roomStatus]);

  return (
    <>
      {
        // 1. 로그인이 되지 않았다면 로그인 화면 출력.
        !isLogin ? (
          <GameLogin isLogin={isLogin} setIsLogin={setIsLogin} setMember={setMember} />
        ) : // 2. 로그인을 했고, 게임 시작을 진행하지 않았다면 게임초대혹은입장장 화면 출력.
        !isGameStart ? (
          <GameInviteOrParticipation
            isGameStart={isGameStart}
            setIsGameStart={setIsGameStart}
            member={member}
            setRoomInfo={setRoomInfo}
          />
        ) : (
          // 3. 게임 시작이 되면 게임 화면 출력.
          <GameScreen roomStatus={roomStatus} roomInfo={roomInfo} member={member} />
        )
      }
    </>
  );
};

export default GamePage;
