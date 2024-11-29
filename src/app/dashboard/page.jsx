"use client";

import { useSession } from "next-auth/react";
import { SidePanel } from "../../components/side-panel";
import { FormCompanyName } from "../../components/form-company-name";
import { apiList, roles, securedRoutes } from "@/constants";
import { useUser } from "@/hooks/isUserAllowed";
import { EditTaskModal } from "@/components/modals/edit-task";
import { useState, useEffect } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import axios from "axios";
import { Tooltip } from "@/components/ui/tooltip";
import { taskStatus } from "@/constants/task-status";
import { getRoleBasedRender } from "@/helpers/getRoleBasedRender";
export default function Home() {
  const [isModalStatus, setIsModalStatus] = useState(false);
  const { data: session, status } = useSession();
  const [data, setData] = useState();

  useUser();
  async function getTasks() {
    try {
      const response = await axios.get(
        `${apiList.getTask.api}?company=${session?.user?.company}`
      );

      if (session.user.role === roles[2]) {
        setData(
          response?.data.filter((item) => item.owner === session.user.email)
        );
        return;
      }
      if (session.user.role === roles[1]) {
        setData(
          response?.data.filter(
            (item) => item.department === session.user.department
          )
        );
        return;
      }

      setData(response?.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }
  useEffect(() => {
    if (session?.user?.company) {
      getTasks();
    }
  }, [session?.user?.company, isModalStatus]);

  if (status === "loading") {
    return (
      <div className=" flex justify-center items-center h-screen">
        <div className="  bg-gradient-to-t from-black to-white animate-spin size-4 rounded-full aspect-square"></div>
      </div>
    );
  }

  if (!session.user?.company) {
    return <FormCompanyName />;
  }

  return (
    <section className="flex bg-white h-screen">
      {session && securedRoutes[0].access.includes(session?.user?.role) ? (
        <>
          <SidePanel active={securedRoutes[0].name} />
          <div className="pt-14 relative px-4 pl-16    text-white flex   flex-col">
            <h2 className="text-3xl font-bold text-black flex gap-6">
              Dashboard
              <div className="text-[14px] justify-center items-center bg-[#fdf9f7]  rounded-lg px-4 flex gap-3">
                {session?.user?.role}
                <Tooltip
                  openDelay={"0.1"}
                  content="Admin:Can view all task in the company.Manager:Can view all the task in the department.User:Can view only task assigned to them."
                >
                  <HiQuestionMarkCircle size={"22px"} />
                </Tooltip>
              </div>
            </h2>
            <button
              onClick={() => {
                setIsModalStatus(true);
              }}
              className=" flex gap-2 transition-all text-white absolute hover:text-black bg-black hover:bg-white hover:border-black  top-[60px] right-8  px-3 py-2 rounded-md"
            >
              Add task
            </button>

            <div className=" !bg-gradient-to-br !from-gray-50 !to-gray-100 text-black flex flex-col  p-5 gap-3 mt-12 rounded-xl w-[72vw]">
              {data?.length ? (
                data?.map((item, index) => {
                  return (
                    <div
                      className={`flex flex-col gap-3 bg-white p-4 rounded border-b ${
                        index % 2 === 0 && " !bg-transparent"
                      }`}
                      key={item.title}
                    >
                      <h3 className=" flex w-full justify-between">
                        {item.title}
                        <select
                          onChange={async (e) => {
                            await axios.patch(apiList.patchTaskData.api, {
                              id: item.id,
                              status: e.target.value,
                            });
                            getTasks();
                          }}
                          className="  bg-transparent "
                          value={item.status}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {taskStatus.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </h3>
                      <p> {item.description}</p>
                      {getRoleBasedRender(session.user.role, [
                        "ADMIN",
                        "MANAGER",
                      ]) && (
                        <div className="text-[14px]  items-center   rounded-lg  flex gap-3">
                          Assigned to :{item.owner}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div>Empty</div>
              )}
            </div>
          </div>

          <div
            className={` absolute left-0 right-0 top-0 bottom-0 ${
              !isModalStatus && "pointer-events-none"
            } `}
          >
            {" "}
            <EditTaskModal
              isModalSetter={setIsModalStatus}
              isModalOpen={isModalStatus}
            />
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
