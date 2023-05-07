import dynamic from "next/dynamic";
import { FC, PropsWithChildren, useEffect } from "react";
import { ComponentAuthFieldsType } from "./auth-page.types";
import { useAuth, useActions } from "@/hooks";
import { useRouter } from "next/router";
import StorageService from "@/services/storage.service";

const DynamicCheckRole = dynamic(() => import("./CheckRole"), { ssr: false });

const AuthProvider: FC<PropsWithChildren<ComponentAuthFieldsType>> = ({
  Component: { isAdmin, isUser },
  children,
}) => {
  const { user } = useAuth();
  const { logout, checkAuth } = useActions();

  const router = useRouter();

  useEffect(() => {
    const accessToken = StorageService.getAccessToken();
    if (accessToken) checkAuth();
  }, []);

  useEffect(() => {
    const refreshToken = StorageService.getRefreshToken();
    if (!refreshToken && user) {
      logout();
    }
  }, [router.pathname]);

  useEffect(() => {
    if (user && router.pathname === "/auth") router.replace("/");
  }, [user]);

  return isUser || isAdmin ? (
    <DynamicCheckRole Component={{ isAdmin, isUser }}>
      {children}
    </DynamicCheckRole>
  ) : (
    <>{children}</>
  );
};

export default AuthProvider;
