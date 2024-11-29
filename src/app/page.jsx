"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import SignInButton from "../components/sign-in-button";
import { Tooltip } from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import { apiList, signInTypes } from "@/constants";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isZeroAuth, setIsZeroAuth] = useState(false);

  async function handeSignup() {
    if (password === "" || email === "") {
      toaster.create({
        title: "Error",
        description: "Please enter username and password",
      });
      return;
    }
    if (!isUserRegistered) {
      if (company === "") {
        toaster.create({
          title: "Error",
          description: "Please enter company",
        });
        return;
      }
    }
    try {
      await signIn("credentials", {
        email,
        password,
        company,
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
    }
  }

  async function checkUserAlreadyRegistered() {
    const response = await axios.get(
      `${apiList.checkUserIsAlreadyRegistered.api}?email=${email}`
    );
    if (response.data.signType !== signInTypes.none) {
      setIsUserRegistered(true);
      if (response.data.signType === signInTypes.zeroAuth) {
        setIsZeroAuth(true);
      } else {
        setIsZeroAuth(false);
      }
    } else {
      setIsZeroAuth(false);
      setIsUserRegistered(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="  bg-white w-[400px]   text-black rounded-2xl p-9 px-2 flex justify-center items-center flex-col  gap-4">
        <div className=" text-xl">openTaskManager</div>
        <div className=" flex flex-col gap-4">
          <input
            onBlur={checkUserAlreadyRegistered}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className=" p-2 px-3   w-[310px] bg-transparent border-b border-black"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className={` p-2 px-3  w-[310px] bg-transparent border-b border-black transition-all ${
              isZeroAuth && "h-0 max-h-0 opacity-0"
            } `}
          />

          <input
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            type="text"
            className={` p-2 px-3  w-[310px] bg-transparent border-b border-black  transition-all  ${
              isUserRegistered && "h-0 max-h-0 opacity-0"
            } `}
          />
          <p
            className={`${
              isUserRegistered && " text-center h-0 max-h-0 opacity-0"
            }   text-xs text-black `}
          >
            The company's first registered member will automatically <br></br>{" "}
            be assigned the <span className=" font-bold">Admin role</span>.
          </p>
        </div>

        <Button
          onClick={handeSignup}
          size="sm"
          className={`${
            isZeroAuth && "h-0 max-h-0 opacity-0"
          } bg-black text-white hover:bg-white hover:text-black  hover:border-black hover:border transition-all px-4 py-2 flex justify-between items-center`}
        >
          {isUserRegistered ? "Sign in" : "Sign Up"}

          <Tooltip
            openDelay={"0.1"}
            content="If account is not present then it will be automatically created."
          >
            <HiQuestionMarkCircle />
          </Tooltip>
        </Button>
        <div
          className={`${
            !isZeroAuth && "h-0 max-h-0 opacity-0"
          } text-xs text-center transition-all`}
        >
          This account was created using Google Sign-In.<br></br> Please log in
          using your Google account
        </div>
        <div className={`${isZeroAuth && " border rounded border-black"}`}>
          {" "}
          <SignInButton />
        </div>
        <Toaster />
      </div>
    </div>
  );
}
