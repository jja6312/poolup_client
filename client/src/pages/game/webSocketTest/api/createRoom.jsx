import api from '../../../../api/instance';

export const createRoom = async (memberId) => {
  const response = await api('http://localhost:8080/api/v1/game/room', {
    method: 'POST',
    json: { memberId },
  });

  console.log('방생성', response);
  return response;
};
