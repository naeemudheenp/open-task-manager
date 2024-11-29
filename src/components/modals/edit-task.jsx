import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";

import { apiList } from "@/constants";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export const EditTaskModal = ({ isModalOpen, isModalSetter }) => {
  const [open, setOpen] = useState(isModalOpen);
  const [taskName, settaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const session = useSession();
  useEffect(() => {
    setOpen(isModalOpen);
  }, [isModalOpen]);

  async function handleData() {
    if (taskName === "" || taskDesc === "") {
      alert("Please complete data.");
      return;
    }
    const data = {
      description: taskDesc,
      title: taskName,
      owner: session?.data?.user?.email,
      department: session?.data?.user?.department,
      company: session?.data?.user?.company,
    };
    const res = await axios.post(apiList.createTask.api, data);
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
            Add task
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex gap-2 flex-col !text-black !bg-gradient-to-br !from-gray-50 !to-gray-100 rounded-lg mx-4">
          <input
            onChange={(e) => settaskName(e.target.value)}
            value={taskName}
            placeholder="Task"
            className=" bg-white p-4  rounded-lg"
          ></input>
          <input
            onChange={(e) => setTaskDesc(e.target.value)}
            value={taskDesc}
            placeholder="Description"
            className=" bg-white p-4 rounded-lg h-[200px]"
          ></input>
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
