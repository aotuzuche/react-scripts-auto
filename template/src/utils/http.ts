import axios from 'axios';

// type an error
class HttpError extends Error {
  public data: null;
  constructor(message: string, data?: any) {
    super();
    this.message = message;
    this.name = 'HttpError';
    this.data = data || null;
  }
}

/**
 * 配置axios
 */
const http = axios.create({
  baseURL: '/',
});

/**
 * 请求拦截器，在发起请求之前
 */
http.interceptors.request.use(config => {
  return config;
});

/**
 * 接口响应拦截器，在接口响应之后
 */
http.interceptors.response.use(
  config => {
    // 响应正常
    if (config.data.code === 0) {
      return config.data.data;
    }
    if (config.status === 204) {
      return '';
    }
    // reject错误处理
    return Promise.reject(new HttpError(config.data.msg, config.data));
  },
  error => {
    // reject错误处理
    return Promise.reject(
      new HttpError(error && error.message ? error.message : '系统错误'),
    );
  },
);

export default http;
