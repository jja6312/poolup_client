import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = () => {
  const client = useRef(null); // STOMP Client 객체
  const [roomStatus, setRoomStatus] = useState('WAITING'); // 방 상태를 저장하는 상태
  const [roomInfo, setRoomInfo] = useState({
    roomId: '',
    player1P: { memberId: 0, name: '', score: 0 },
    player2P: { memberId: 0, name: '', score: 0 },
    disabledCards: [],
  });

  useEffect(() => {
    console.log('roomInfo', roomInfo);
  }, [roomInfo]);

  useEffect(() => {
    console.log('SockJS 연결 초기화');
    const socketURL = 'http://localhost:8080/game-websocket';

    client.current = new Client({
      webSocketFactory: () => new SockJS(socketURL),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.onConnect = () => {
      console.log('WebSocket 연결 성공');

      // 방 상태 구독
      client.current.subscribe('/topic/room-status', (message) => {
        const updatedStatus = JSON.parse(message.body);
        console.log('수신한 방 상태:', updatedStatus);
        setRoomStatus(updatedStatus.body.status); // 방 상태 업데이트
        setRoomInfo({
          roomId: updatedStatus.body.roomId,
          player1P: {
            memberId: updatedStatus.body.player1P.memberId,
            name: updatedStatus.body.player1P.name,
          },
          player2P: {
            memberId: updatedStatus.body.player2P.memberId,
            name: updatedStatus.body.player2P.name,
          },
          disabledCards: [],
        });
      });

      // 정답 확인 구독
      client.current.subscribe('/topic/answer-correct', (message) => {
        const { problemNumber, score1P, score2P } = JSON.parse(message.body);
        console.log('!!!!!!!STOMP토픽 메시지 수신', problemNumber, score1P, score2P);

        setRoomInfo((prevRoomInfo) => ({
          ...prevRoomInfo,
          disabledCards: [...prevRoomInfo.disabledCards, problemNumber], // 정답 처리된 카드 추가

          player1P: {
            ...prevRoomInfo.player1P,
            score: score1P, // 1P 점수 갱신
          },
          player2P: {
            ...prevRoomInfo.player2P,
            score: score2P, // 2P 점수 갱신
          },
        }));
      });
    };

    client.current.onStompError = (frame) => {
      console.error('STOMP 에러:', frame.headers['message']);
    };

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  const sendMessage = (destination, payload) => {
    if (!client.current || !client.current.connected) {
      console.error('WebSocket이 아직 연결되지 않았습니다.');
      return;
    }

    console.log('WebSocket 메시지 전송 중:', destination, payload);
    client.current.publish({ destination, body: JSON.stringify(payload) });
  };

  const subscribe = (destination, callback) => {
    if (client.current && client.current.connected) {
      return client.current.subscribe(destination, callback);
    }
    return { unsubscribe: () => {} }; // 기본 unsubscribe 함수 반환
  };

  return { roomStatus, sendMessage, roomInfo, setRoomInfo, subscribe };
};

export default useWebSocket;
