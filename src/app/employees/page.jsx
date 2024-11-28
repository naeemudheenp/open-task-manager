"use client";

import axios from "axios";
import { SidePanel } from "../../components/side-panel";
import { apiList, securedRoutes } from "@/constants";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Settings } from "lucide-react";
import { Table } from "@chakra-ui/react";
import { EditEmployeeModal } from "@/components/modals/edit-employee";

export default function Employees() {
  const { data: session, status } = useSession();
  const [data, setData] = useState();
  const [isModalStatus, setIsModalStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

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
  }, [session?.user?.company, isModalStatus]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gradient-to-t from-black to-white animate-spin size-4 rounded-full aspect-square"></div>
      </div>
    );
  }

  return (
    <section className="flex bg-white h-screen">
      {session ? (
        <>
          <SidePanel active={securedRoutes[1].name} />
          <div className="pt-14 pl-16  text-white">
            <h2 className="text-3xl font-bold text-black"> Employee</h2>
            {data ? (
              <div className="!text-black bg-[#fdf9f7] p-5 gap-3 mt-12 rounded-xl w-[52vw]">
                <Table.Root
                  colorPalette={"white"}
                  interactive
                  size="lg"
                  rounded={"4xl"}
                  showColumnBorde
                  width={"100%"}
                >
                  <Table.Header className="bg-[#fdf9f7]">
                    <Table.Row className="bg-[#fdf9f7]">
                      <Table.ColumnHeader className="!text-black font-bold">
                        Product
                      </Table.ColumnHeader>
                      <Table.ColumnHeader className="!text-black font-bold">
                        Email
                      </Table.ColumnHeader>
                      <Table.ColumnHeader className="!text-black font-bold">
                        Role
                      </Table.ColumnHeader>
                      <Table.ColumnHeader className="!text-black font-bold">
                        Edit
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body className="bg-[#fdf9f7]">
                    {data.map((item) => (
                      <Table.Row key={item.name} className="bg-[#fdf9f7]">
                        <Table.Cell>
                          <div className=" flex  items-center gap-4">
                            {item.name}

                            {item.name === session?.user?.name && (
                              <div className=" bg-green-200 text-green-900 flex  justify-center items-center rounded-md px-1  text-[8px]">
                                Current user
                              </div>
                            )}
                          </div>
                        </Table.Cell>
                        <Table.Cell>{item.email}</Table.Cell>
                        <Table.Cell>{item.role}</Table.Cell>

                        <Table.Cell>
                          {
                            <Settings
                              onClick={() => {
                                setSelectedUser({
                                  name: item.name,
                                  role: item.role,
                                  email: item.email,
                                });
                                setIsModalStatus((prev) => !prev);
                              }}
                              className=" hover:scale-105 transition-all  cursor-pointer"
                              size={16}
                            />
                          }
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
            ) : (
              <div>Loading....</div>
            )}
          </div>
          <div
            className={` absolute left-0 right-0 top-0 bottom-0 ${
              !isModalStatus && "pointer-events-none"
            } `}
          >
            {" "}
            <EditEmployeeModal
              selectedData={selectedUser}
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
