import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";

import { apiList, roles } from "@/constants";
import { useState, useEffect } from "react";
import axios from "axios";
export const EditEmployeeModal = ({
  isModalOpen,
  isModalSetter,
  selectedData,
}) => {
  const [open, setOpen] = useState(isModalOpen);
  const [selectedRole, setSelectedRole] = useState("");
  useEffect(() => {
    setOpen(isModalOpen);
    setSelectedRole(selectedData.role);
  }, [isModalOpen]);

  async function handleData() {
    const patchData = {
      email: selectedData.email,
      role: selectedRole,
    };
    const res = await axios.patch(apiList.patchEmployeeData.api, patchData);
    if (res) {
      isModalSetter(false);
      toaster.create({
        title: "Done",
      });
    }
  }
  return (
    <DialogRoot
      className="!bg-white"
      colorPalette={"teal"}
      centered
      open={open}
    >
      <DialogContent className=" !bg-white text-black !z-[1]">
        <DialogHeader>
          <DialogTitle className=" font-bold text-md !bg-white text-black">
            Edit employee {"=>"} {selectedData.name} | {selectedData.role}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex gap-2 flex-col !text-black !bg-gradient-to-br !from-gray-50 !to-gray-100 rounded-lg mx-4">
          <h4 className=" font-medium">Actions</h4>
          <ul className=" font-bold">
            <li className=" items-center !z-[100] flex gap-4 text-[12px]">
              Change role:
              <select
                className="  bg-transparent text-black"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </li>
          </ul>
          <Toaster />
        </DialogBody>
        <DialogFooter>
          <button
            className=" px-3 py-2 rounded bg-red-500 text-white"
            onClick={() => isModalSetter(false)}
          >
            Close
          </button>
          <button
            className=" px-3 py-2 rounded bg-green-500 text-white"
            onClick={handleData}
          >
            Save
          </button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
