"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <div className="navbar sticky top-0 z-50 bg-neutral-medium">
      <div className="navbar-start">
        <img src="/LogoKollette.png" alt="" className="w-7 pl-2" />
        <a className="  p-2 text-xl font-medium normal-case text-white ">
          Kollette
        </a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <ConnectWallet colorMode="dark" />
      </div>
    </div>
  );
};

export default Navbar;
