"use client";

import { useSession } from "next-auth/react";
import { SidePanel } from "../../components/side-panel";
import { FormCompanyName } from "../../components/form-company-name";
import { securedRoutes } from "@/constants";
import { useUser } from "@/hooks/isUserAllowed";
export default function Home() {
  useUser();
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
  if (!session.data.user?.company) {
    return <FormCompanyName />;
  }
  return (
    <section className=" flex bg-white h-screen">
      <SidePanel active={securedRoutes[0].name} />
    </section>
  );
}
