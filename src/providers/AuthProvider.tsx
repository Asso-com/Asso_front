import {
  createContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
  useLayoutEffect,
} from "react";
import AppLoader from "@components/shared/loader/Loader.";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../services/api-services/axiosInstance";
import AuthServiceApi from "../services/api-services/AuthServiceApi";
import type { RootState } from "../store";
import type { LoginRequest, AuthResponse } from "../types/authTypes";

import { setInitialState, handleLogout } from "../store/authSlice";

interface AuthContextType {
  accessToken: string | null;
  loginProvider: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  loginProvider: async () => {},
  logout: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();


  const isUserLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isUserLoggedIn
  );

  // Effect to fetch a new access token using the refresh token when the component mounts
  useEffect(() => {
    const fetchRefreshToken = async () => {
      if (!isUserLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await AuthServiceApi.refreshToken();
        setAccessToken(response.accessToken);
      } catch (err) {
        await handleLogoutProcess();
      } finally {
        setLoading(false);
      }
    };

    fetchRefreshToken();
  }, []);

  // Effect to add an interceptor for adding the access token to request headers
  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use((config) => {
      const requestConfig = config as typeof config & { _retry?: boolean };

      if (accessToken && !requestConfig._retry) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      return requestConfig;
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  // Effect to add an interceptor for handling 403 errors (unauthorized) and refreshing the token
  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true; //avoid infinite loops

          try {
            const res = await AuthServiceApi.refreshToken();
            setAccessToken(res.accessToken);
            originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
            return axiosInstance(originalRequest); // Retry the original request with the new token
          } catch (refreshError) {
            await handleLogoutProcess();
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const loginProvider = async (loginData: LoginRequest): Promise<void> => {
    try {
      const response: AuthResponse = await AuthServiceApi.userLogin(loginData);
      setAccessToken(response.accessToken);
      dispatch(
        setInitialState({
          userData: response.userData,
          associationId: response.associationId,
        })
      );
    } catch (err: any) {
      const errors = err?.response?.data?.message || "Login failed";
      throw new Error(errors);
    }
  };

  const handleLogoutProcess = async (): Promise<void> => {
    try {
      await AuthServiceApi.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAccessToken(null);
      dispatch(handleLogout());
    }
  };

  const logout = async (): Promise<void> => {
    await handleLogoutProcess();
  };

  const contextValue = useMemo(
    () => ({
      accessToken,
      loginProvider,
      logout,
    }),
    [accessToken]
  );
  if (loading) return <AppLoader />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
