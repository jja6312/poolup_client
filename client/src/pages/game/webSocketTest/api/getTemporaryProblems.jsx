import api from '../../../../api/instance';

export const getTemporaryProblems = async (limit = 10) => {
  try {
    const response = await api(`http://localhost:8080/api/v1/game/temporaryProblems?limit=${limit}`, {
      method: 'GET',
    });
    return response; // 수정된 api 함수에서 이미 JSON 데이터를 반환
  } catch (error) {
    console.error('getTemporaryProblems API 호출 실패:', error);
    throw error;
  }
};
