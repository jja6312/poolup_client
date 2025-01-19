import api from '../../../../api/instance';

export const createRoom = async (memberId) => {
  try {
    const response = await api('http://localhost:8080/api/v1/game/room', {
      method: 'POST',
      json: { memberId },
    });

    console.log('방 생성 성공:', response);
    return response;
  } catch (error) {
    console.error('방 생성 실패:', error);
    throw error;
  }
};
