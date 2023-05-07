import { FC, PropsWithChildren } from "react";
import Header from "./Header";
import { Meta } from "@/components/ui";
import { ISeo } from "@/components/ui/Meta";
import { Nunito } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

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
      <main
        className={`min-h-screen pb-8 ${bgColor || "bg-gray-200"} ${
          nunito.className
        }`}
      >
        <Header />
        <div className={`${container && "wcontainer"}`}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
