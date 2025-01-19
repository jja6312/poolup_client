import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const useWebSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS('/game-websocket'); // 서버 WebSocket 엔드포인트
    const client = Stomp.over(socket);

    console.log('WebSocket 초기화 중...');

    client.connect(
      {},
      () => {
        console.log('웹소켓 연결 성공');
        setStompClient(client);

        // 방 상태 업데이트 메시지 구독
        client.subscribe('/topic/room-status', (message) => {
          const response = JSON.parse(message.body);
          console.log('수신한 메시지:', response); // 디버깅용 로그
          setMessages((prev) => [...prev, response]);
        });
      },
      (error) => console.error('웹소켓 연결 실패:', error),
    );

    return () => {
      if (client) {
        client.disconnect(() => console.log('웹소켓 연결 끊어짐.'));
      }
    };
  }, []);

  const sendMessage = (destination, payload) => {
    if (!stompClient) {
      console.warn('WebSocket 클라이언트가 초기화되지 않았습니다.');
      return;
    }

    console.log('WebSocket 메시지 전송 중:', destination, payload);
    stompClient.send(destination, {}, JSON.stringify(payload));
  };

  return { messages, sendMessage };
};

export default useWebSocket;
