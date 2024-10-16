import { getCookie, setCookie, destroyCookie } from '@ek-components/utils';
import { LoginResponse } from '@ek-types';
import { CookieNames } from './cookieNames';

export const getAccessToken = () => {
  const userInfo = getLocalUserInfo();
  return userInfo?.accessToken || '';
};
export const getRefreshToken = () => {
  const userInfo = getLocalUserInfo();
  return userInfo?.refreshToken || '';
};

export const setLocalUserInfo = (data: LoginResponse) => {
  setCookie({ name: CookieNames.userInfo, value: JSON.stringify(data) });
};

export const getLocalUserInfo = (): LoginResponse => {
  const userInfo = getCookie({ name: CookieNames.userInfo });
  return userInfo ? JSON.parse(userInfo) : null;
};

export const destroyLocalUserInfo = () => {
  destroyCookie({ name: CookieNames.userInfo });
};
