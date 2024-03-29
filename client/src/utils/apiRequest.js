import axios from 'axios';
// import store from '@state/store';

export const axiosInstance = (() => {
  const options = {
    baseURL: process.env.VUE_APP_HERMES_API_BASE_URL,
    timeout: 120000,
  };

  let requestHeaders = {
    Accept: 'application/json',
  };
  const axiosClient = axios.create(options);

  axiosClient.interceptors.request.use(
    (requestConfig) => {
      // const token = store.getters['auth/token'];

      // if (token) {
      //   requestHeaders = {
      //     ...requestHeaders,
      //     Authorization: `Bearer ${token}`,
      //   };
      // }

      requestConfig.headers = {
        ...requestHeaders,
      };

      return requestConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    },
  );

  axiosClient.interceptors.response.use(
    response => response,
    (error) => {
      // const windowReload = () => {
      //   window.location.reload();
      // };
      // if (error.response.status === 401) {
      //   // const token = store.getters['auth/token'];
      //   if () {
      //     store.dispatch('auth/logOut')
      //       .then(windowReload)
      //       .catch(windowReload);
      //   }
      // }
      return Promise.reject(error);
    },
  );

  return axiosClient;
})();

function makeRequest(meta) {
  const { url, method = 'get', params, headers, data, ...rest } = meta;
  const httpOptions = {
    method: method.toLowerCase(),
    url,
    headers,
    data,
    params,
    ...rest,
  };

  return axiosInstance.request(httpOptions);
}

export default makeRequest;
