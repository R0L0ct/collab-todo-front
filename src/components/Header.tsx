"use client";
import { authAtom } from "@/store/store";
import { useAtomValue } from "jotai";
import Link from "next/link";

const Header = () => {
  const atom = useAtomValue(authAtom);
  return (
    <header className="flex justify-between items-center h-[50px] bg-[#1A1A1A] text-white px-6 shadow-md">
      <Link href={"/"}>
        <div className="text-xl font-bold">ToDo</div>
      </Link>

      {atom?.user ? (
        <p className="text-white text-l font-bold">
          {atom.user.username.toUpperCase()}
        </p>
      ) : (
        <nav className="flex gap-6">
          <Link
            href="/register"
            className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
          >
            Registro
          </Link>
          <Link
            href="/login"
            className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
          >
            Ingresar
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
