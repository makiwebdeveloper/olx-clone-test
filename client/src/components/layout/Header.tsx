import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSSR } from "@/hooks/useSSR";
import Image from "next/image";
import Link from "next/link";
import { BsBalloonHeart } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import Logo from "@/assets/images/logo.png";

const Header: FC = () => {
  const { isBrowser } = useSSR();
  const { user } = useAuth();

  return (
    <header id="header" className="bg-teal-900">
      <div className="wcontainer py-3 flex items-center justify-between">
        <Image src={Logo} width={100} height={57} alt="logo" />
        <nav className="flex items-center gap-6 sm:gap-10 text-xl xl:text-2xl">
          <Link
            href="/favorites"
            className="text-white transition hover:text-opacity-60"
          >
            <BsBalloonHeart className="w-8 h-8 sm:w-6 sm:h-6" />
          </Link>
          {isBrowser && (
            <Link
              href={user ? "/profile" : "/auth"}
              className="text-white transition hover:text-opacity-60 flex items-center gap-2"
            >
              <BiUser className="w-8 h-8 sm:w-6 sm:h-6" />{" "}
              <p className="hidden sm:block">
                {user ? "Ваш профіль" : "Війти"}
              </p>
            </Link>
          )}
          <Link
            href="/add-post"
            className="text-white transition hover:text-opacity-60 flex items-center gap-2"
          >
            <MdPostAdd className="w-8 h-8 sm:w-6 sm:h-6" />
            <p className="hidden sm:block">Додати оголошення</p>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
