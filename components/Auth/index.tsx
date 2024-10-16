import React, { useCallback, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '@ek-components/utils';
import { useRouter, usePathname } from 'next/navigation';
import { postApi } from '@ek-components/utils';
import { useMutation } from '@tanstack/react-query';
import { ApiUrl } from '@ek-components/config/api';
import { getAccessToken, getRefreshToken } from './authToken';
import { publicRoutes } from '@ek-components/config/publicRoutes';
import { AppRoutes } from '@ek-components/config/appRoutes';
interface AuthProviderProps {
  children: React.ReactNode;
}

const isTokenExpired = (token: string) => {
  return false;
  const decodedToken: any = jwtDecode(token);
  return decodedToken.exp * 1000 < Date.now();
};
export const silentRefreshToken = async () => {
  const token = getAccessToken();
  if (token) {
    if (isTokenExpired(token)) {
      const newToken = await postApi({
        url: ApiUrl.SUBMIT_EXAM,
        data: {
          token: getRefreshToken(),
        },
      });
      if (newToken) {
        return newToken;
      }
    }
  }
  return null;
};

setInterval(() => {
  silentRefreshToken();
}, 5000);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathName = usePathname() as AppRoutes;
  const [loading, setLoading] = useState(true);
  const {
    mutateAsync: refreshTokenApi,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data: { token: string }) => {
      return await postApi<{
        accessToken: string;
        refreshToken: string;
      }>({
        url: ApiUrl.REFRESH_TOKEN,
        data,
      });
    },
  });

  const refreshToken = useCallback(async () => {
    const result = await refreshTokenApi({
      token: getRefreshToken(),
    });
    if (result) {
      return result?.accessToken;
    }
    return null;
  }, []);

  useEffect(() => {
    console.log('AuthProvider');
    const token = getAccessToken();
    if (token) {
      if (isTokenExpired(token)) {
        refreshToken().then((newToken) => {
          if (newToken) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
          setLoading(false);
        });
      } else {
        // Token is not expired
        setIsAuthenticated(true);
        setLoading(false);
      }
    } else {
      // No token, user is not authenticated
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    // Loading state, you can return a loading spinner or something similar here
    return (
      <body>
        <div>Loading...</div>
      </body>
    );
  }

  if (!isAuthenticated) {
    if (publicRoutes.includes(pathName)) {
      return <>{children}</>;
    }

    router.push('/login');
    return null;
  }

  // If the user is authenticated, render the children
  return <>{children}</>;
};
