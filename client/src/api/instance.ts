import ky, { Options } from 'ky';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const customInstance = instance.extend({
  hooks: {
    beforeRequest: [() => {}], // accessToken 넣기
    afterResponse: [
      (_request, _optionsresponse, response) => {
        if (response.ok) return response;
        throw new Error('Response is not OK');
      },
      (request, options, response) => {
        if (response.status == 403) {
          console.log('reissue');
        }
      },
    ],
  },
});

const api = (url: string, options?: Options) =>
  customInstance(url, options).then((response) =>
    response
      .json()
      .then((data) => data)
      .catch((error) => {
        throw error;
      }),
  );

export default api;
