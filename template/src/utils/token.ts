const token = '__demo.token__';

/**
 * token的操作方法，设置、获取、删除
 */
export const getToken = () => localStorage.getItem(token);
export const setToken = (t: string) => localStorage.setItem(token, t);
export const clearToken = () => localStorage.removeItem(token);
