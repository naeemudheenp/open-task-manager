"use client";
import Link from "next/link";
import { securedRoutes } from "../constants/secured-routes";
import { getRoleBasedRender } from "../app/helpers/getRoleBasedRender";
import { signOut, useSession } from "next-auth/react";

export function SidePanel() {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className=" flex justify-center items-center">
        <div className="  bg-gradient-to-t from-black to-white animate-spin size-4 rounded-full aspect-square"></div>
      </div>
    );
  }

  if (!session?.data) {
    return (
      <div className=" flex justify-center items-center">
        Unauthorised access.
      </div>
    );
  }

  return (
    <div className=" relative flex basis-[21%] bg-[#fdf9f7] h-full  pl-5 pt-14 text-black flex-col gap-12">
      <h2 className=" text-3xl font-bold">openTaskManager</h2>
      {securedRoutes.map((item) => {
        const userAccess = getRoleBasedRender(
          session?.data?.user?.role,
          item.access
        );
        if (userAccess) {
          return (
            <Link
              className={`${
                userAccess ? " bg-red-500" : " bg-green-600"
              } text-xl`}
              href={item.url}
              key={item.name}
            >
              {item.name}
            </Link>
          );
        }
      })}

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className=" mx-auto bg-black cursor-pointer hover:bg-white hover:text-black transition-all text-white left-0 right-0 rounded-md  absolute  bottom-[52px] h-12 flex  w-44 justify-center items-center"
      >
        Logout
      </button>
    </div>
  );
}
