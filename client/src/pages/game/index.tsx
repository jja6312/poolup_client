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
    id: '',
    name: '',
    email: '',
  });

  //================ 인수인계 이후 내용 ================
  const [players, setPlayers] = useState({
    // 방생성시 1P가 정해진다. 초대링크를통해 접근한다면 2P가 정해진다.
    player1P: { memberId: 0, name: '' },
    player2P: { memberId: 0, name: '' },
  });

  // WebSocket에서 roomStatus를 관리한다.
  const { roomStatus } = useWebSocket({ isGameStart });

  // WebSocket 메시지 수신 시 상태 업데이트
  //===================================================
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
            setPlayers={setPlayers}
          />
        ) : (
          // 3. 게임 시작이 되면 게임 화면 출력.
          <GameScreen roomStatus={roomStatus} players={players} />
        )
      }
    </>
  );
};

export default GamePage;
