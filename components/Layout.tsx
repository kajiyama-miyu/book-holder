import Head from "next/head";
import Image from "next/image";
import { useState, useCallback } from "react";
import SideMenu from "./SideMenu";
import React from "react";
import { Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import HeaderMenu from "./HeaderMenu";
type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ children, title = "books" }) => {
  const [isSideOpen, setSideOpen] = useState(false);

  const handleOpen = useCallback(
    (open: boolean) => {
      setSideOpen(open);
    },
    [setSideOpen]
  );

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-m=sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-yellow-300 w-screen">
          <div className="inline-flex justify-center items-center pl-8 h-16">
            <div className="flex items-center mr-64 text-xl">
              <HeaderMenu handleOpen={handleOpen} />
              <SideMenu isOpen={isSideOpen} handleOpen={handleOpen} />
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
