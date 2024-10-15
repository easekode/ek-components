import { CookieNames } from '@ek-components/Auth/cookieNames';
import { cookies } from 'next/headers';

export const getServerApiCallConfig = () => {
  return {
    headers: {
      Authorization: getAccessToken(),
    },
  };
};

const getAccessToken = () => {
  const cookieHeaders = cookies();

  const userInfo = cookieHeaders.get(CookieNames.userInfo)?.value;
  if (!userInfo) {
    throw new Error('UserInfo is undefined');
  }
  const data = JSON.parse(userInfo);

  return data?.accessToken;
};
