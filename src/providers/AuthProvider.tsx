import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
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
  }, [isUserLoggedIn]);

  useEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  // --------------------
  // Axios Refresh Token on 403
  // --------------------
  useEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const res = await AuthServiceApi.refreshToken();
            setAccessToken(res.accessToken);
            originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
            return axiosInstance(originalRequest);
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
      console.error("Login failed:", err);
      //throw new Error(err?.response?.data?.message || "Login failed");
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

  const contextValue = useMemo<AuthContextType>(
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
