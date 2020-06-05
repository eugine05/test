export default {
  getContent: async (url: string) => {
    return new Promise((succeed, fail) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.addEventListener('load', () => {
        request.status < 400 ?
            succeed(request.response) : fail(new Error(request.statusText));
      },
      );
      request.addEventListener('error', () => {
        fail(new Error('Network error'));
      });
      request.send();
    });
  },
};
