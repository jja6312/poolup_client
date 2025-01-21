import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = ({ isGameStart = false } = {}) => {
  const client = useRef(null); // STOMP Client 객체
  const [roomStatus, setRoomStatus] = useState('WAITING'); // 방 상태를 저장하는 상태

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
        setRoomStatus(updatedStatus.status); // 방 상태 업데이트
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
  }, [isGameStart]);

  const sendMessage = (destination, payload) => {
    if (!client.current || !client.current.connected) {
      console.error('WebSocket이 아직 연결되지 않았습니다.');
      return;
    }

    console.log('WebSocket 메시지 전송 중:', destination, payload);
    client.current.publish({ destination, body: JSON.stringify(payload) });
  };

  return { roomStatus, sendMessage };
};

export default useWebSocket;
