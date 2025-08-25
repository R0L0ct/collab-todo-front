"use client";

import { refreshAccessToken } from "@/api/data";
import { authAtom } from "@/store/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const atom = useSetAtom(authAtom);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await refreshAccessToken();

        if (!response) return;

        atom(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return <div>{children}</div>;
};

export default Layout;
