import { NextPageContext } from 'next';
import nookies, {
  parseCookies,
  setCookie as nSetCookie,
  destroyCookie as nDestroyCookie,
} from 'nookies';

export const cookieOptions = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
};

export interface SetCookieInput {
  pageContext?: NextPageContext;
  name: string;
  value: any;
}

export interface GetCookieInput {
  pageContext?: NextPageContext;
  name: string;
}
  
export const setCookie = (input: SetCookieInput) => {
  const { pageContext, name, value } = input;
  if (!pageContext) {
    nSetCookie(null, name, value, cookieOptions);
  }
  // for client side pageContext is empty
  nookies.set(pageContext, name, value, cookieOptions);
};

export const getCookie = (input: GetCookieInput) => {
  const { pageContext, name } = input;
  if (pageContext) {
    const cookies = nookies.get(pageContext);
    return cookies[name];
  }
  const cookies = parseCookies();
  return cookies[name];
};

export interface DestroyCookieInput {
  pageContext?: NextPageContext;
  name: string;
}

export const destroyCookie = (input: DestroyCookieInput) => {
  const { pageContext, name } = input;
  if (pageContext) {
    nDestroyCookie(pageContext, name,  { path: '/' });
    return;
  }

  nookies.destroy(null, name,  { path: '/' });
};
