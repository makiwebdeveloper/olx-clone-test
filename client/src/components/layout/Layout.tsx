import { FC, PropsWithChildren } from "react";
import Header from "./Header";
import { Meta } from "@/components/ui";
import { ISeo } from "@/components/ui/Meta";

interface Props extends ISeo {
  bgColor?: string;
  container?: boolean;
}

const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  bgColor,
  container,
  ...meta
}) => {
  return (
    <>
      <Meta {...meta} />
      <main className={`min-h-screen ${bgColor || "bg-gray-200"}`}>
        <Header />
        <div className={`${container && "wcontainer"}`}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
