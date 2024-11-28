"use client";

import axios from "axios";
import { SidePanel } from "../../components/side-panel";
import { apiList, securedRoutes } from "@/constants";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Settings } from "lucide-react";

export default function Employees() {
  const { data: session, status } = useSession();
  const [data, setData] = useState();

  async function getEmployees() {
    try {
      const response = await axios.get(
        `${apiList.getEmployees.api}?company=${session?.user?.company}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  useEffect(() => {
    if (session?.user?.company) {
      getEmployees();
    }
  }, [session?.user?.company]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <div className="bg-gradient-to-t from-black to-white animate-spin size-4 rounded-full aspect-square"></div>
      </div>
    );
  }

  return (
    <section className="flex bg-white h-screen">
      {session ? (
        <>
          <SidePanel active={securedRoutes[1].name} />
          <div className="pt-14 pl-16  text-black">
            <h2 className="text-3xl font-bold"> Employee</h2>
            {data ? (
              <table className="mt-12 border rounded">
                <tbody>
                  <tr>
                    <td className="border py-2 px-5 w-[300px]">Name</td>
                    <td className="border py-2 px-5">Role</td>
                    <td className="border py-2 px-5">Edit</td>
                  </tr>
                  {data?.map((item, index) => (
                    <tr
                      key={item.name}
                      className={`${index % 2 === 0 && "bg-[#fdf9f7]"}`}
                    >
                      <td className=" py-2 px-5 w-[300px] flex gap-2">
                        {item.name}

                        {item.name === session?.user?.name && (
                          <div className=" bg-green-200 text-green-900 flex  justify-center items-center rounded-md px-1 py-1 text-[8px]">
                            Current user
                          </div>
                        )}
                      </td>
                      <td className=" py-2 px-5">{item.role}</td>
                      <td className=" py-2 px-5 hover:scale-[1.1] cursor-pointer  transition-all">
                        <Settings size={16} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Loading....</div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center  w-screen">
          Unauthorized access.
        </div>
      )}
    </section>
  );
}
