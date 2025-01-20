import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = ({ isGameStart = false } = {}) => {
  const client = useRef(null); // STOMP Client 객체
  const [messageQueue, setMessageQueue] = useState([]); // 웹소켓 연결이 완전히 수행되고 메시지가 전송될 수 있도록 저장하는 역할의 메시지 큐
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isGameStart) return;

    console.log('SockJS 연결 초기화');
    const socketURL = 'http://localhost:8080/game-websocket';

    client.current = new Client({
      webSocketFactory: () => new SockJS(socketURL), // SockJS를 사용한 WebSocket 팩토리
      debug: (str) => console.log(str), // 디버깅 로그
      reconnectDelay: 5000, // 재연결 딜레이
      heartbeatIncoming: 4000, // Heartbeat 수신 간격
      heartbeatOutgoing: 4000, // Heartbeat 송신 간격
    });

    // 연결 성공 시 콜백
    client.current.onConnect = () => {
      console.log('WebSocket 연결 성공');
      client.current.subscribe('/topic/room-status', (message) => {
        const response = JSON.parse(message.body);
        console.log('수신한 메시지:', response);
        setMessages((prev) => [...prev, response]);
      });

      setMessageQueue((queue) => {
        queue.forEach(({ destination, payload }) => {
          console.log('큐에 저장된 메시지 전송:', destination, payload);
          client.current.publish({ destination, body: JSON.stringify(payload) });
        });
        return []; // 처리 후 큐 초기화
      });
    };

    // 연결 종료 시 콜백
    client.current.onDisconnect = () => {
      console.log('WebSocket 연결 종료');
    };

    // STOMP 에러 발생 시 콜백
    client.current.onStompError = (frame) => {
      console.error('STOMP 에러:', frame.headers['message']);
      console.error('추가 정보:', frame.body);
    };

    // 클라이언트 활성화
    client.current.activate();

    // 정리 함수
    return () => {
      if (client.current) {
        client.current.deactivate(); // 연결 비활성화
      }
    };
  }, [isGameStart]);

  const sendMessage = (destination, payload) => {
    if (!client.current || !client.current.connected) {
      console.warn('WebSocket이 아직 연결되지 않았습니다. 큐에 저장합니다.');
      console.log('message queue에 저장하는내용1', destination);
      console.log('message queue에 저장하는내용2', payload);
      setMessageQueue((prevQueue) => [...prevQueue, { destination, payload }]); // 기존 큐 복사 후 새 메시지 추가

      return;
    }

    console.log('WebSocket 메시지 전송 중:', destination, payload);
    client.current.publish({ destination, body: JSON.stringify(payload) });
  };

  return { messages, sendMessage };
};

export default useWebSocket;
