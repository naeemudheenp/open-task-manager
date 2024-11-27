"use client";

// import { Tooltip } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import SignInButton from "../app/components/SignInButton";
import { Tooltip } from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";

import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handeSignup() {
    if (password === "" || email === "") {
      toaster.create({
        title: "Error",
        description: "Please enter username and password",
      });
      return;
    }
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
      toaster.create({
        title: "Success",
        description: "",
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Unable to login.",
      });
      console.log("Unable to create user.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="   bg-white w-[400px]   text-black rounded-2xl p-9 px-2 flex justify-center items-center flex-col  gap-9">
        <div className=" text-xl">openTaskManager</div>
        <div className=" flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className=" p-2 px-3   w-[310px] bg-transparent border-b border-black"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className=" p-2 px-3  w-[310px] bg-transparent border-b border-black"
          />
        </div>

        <Button
          onClick={handeSignup}
          size="sm"
          className=" bg-black text-white hover:bg-white hover:text-black  hover:border-black hover:border transition-all px-4 py-2 flex justify-between items-center"
        >
          Sign in
          <Tooltip
            openDelay={"0.1"}
            content="If account is not present then it will be automatically created."
          >
            <HiQuestionMarkCircle />
          </Tooltip>
        </Button>

        <SignInButton />
        <Toaster />
      </div>
    </div>
  );
}
