import api from '../../../../api/instance'; 

export const temporaryLogin = async (email) => {
    const response = await api('http://localhost:8080/api/v1/game/temporaryLogin', {
        method: 'POST',
        json: { email },
    });
    return response;
};