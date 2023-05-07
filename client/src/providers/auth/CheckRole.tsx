import { FC, PropsWithChildren } from "react";
import { ComponentAuthFieldsType } from "./auth-page.types";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";

const CheckRole: FC<PropsWithChildren<ComponentAuthFieldsType>> = ({
  Component: { isUser, isAdmin },
  children,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  if (user && ((isAdmin && user.roles.includes("ADMIN")) || isUser)) {
    return <>{children}</>;
  } else if (!user && (isUser || isAdmin)) {
    router.pathname !== "/auth" && router.replace("/auth");
  } else if (isAdmin && ((user && !user.roles.includes("ADMIN")) || !user)) {
    router.back();
  }

  return null;
};

export default CheckRole;
