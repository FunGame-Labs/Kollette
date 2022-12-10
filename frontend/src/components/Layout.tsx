import Link from "next/link";
import { FC, ReactNode } from "react";
import MenuIconMarket from "../components/MenuIconMarket";
import Navbar from "../components/Navbar";
import MenuIconChests from "./MenuIconChests";
import MenuIconRoulette from "./MenuIconRoulette";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FC = () => {
  return (
    <aside aria-label="Sidebar">
      <div className="flex flex-col items-center gap-4 rounded-full bg-neutral-medium p-2">
        <div className="rounded-full p-2 hover:bg-neutral-light/20">
          <Link href={"/"}>
            <MenuIconRoulette />
          </Link>
        </div>
        <div className="rounded-full p-2 hover:bg-neutral-light/20">
          <Link href={"/chests"}>
            <img src="/menuitem02.png" alt="" className="w-28" />
          </Link>
        </div>
        <div className="rounded-full p-2 hover:bg-neutral-light/20">
          <Link href={"/market"}>
            <img src="/menuitem01.png" alt="" className="w-28" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

const Layout: FC<SidebarProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="fixed top-40 left-0 p-4">
        <Sidebar />
      </div>
      <div className="pl-40">{children}</div>
    </>
  );
};

export default Layout;
