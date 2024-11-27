"use client";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
export function FormCompanyName() {
  const [company, setCompany] = useState("");

  const session = useSession();

  console.log(session, "session");

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

  async function handleSubmit() {
    if (company === "") {
      toaster.create({
        title: "Error",
        description: "Please enter company",
      });
      return;
    }

    try {
      await axios.patch("/api/add-company-name", {
        email: session.data.user.email,
        company: company,
      });

      await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });
      toaster.create({
        title: "Done",
      });
      // window.location.reload();
    } catch (error) {
      toaster.create({
        title: "Error",
      });
      console.log(error, "error");
    }
  }

  return (
    <section className=" flex justify-center items-center h-screen">
      <div className=" flex flex-col gap-6 justify-center items-center  shadow-md bg-white w-[400px]   text-black rounded-2xl p-9 px-4">
        <h3>Please fill company name</h3>
        <input
          onChange={(e) => setCompany(e.target.value)}
          className=" border-b bg-white w-full"
          placeholder="company"
        ></input>
        <button
          onClick={handleSubmit}
          className=" rounded-md bg-black text-white hover:bg-white hover:text-black  hover:border-black hover:border transition-all px-4 py-2 flex justify-between items-center"
        >
          {" "}
          Submit
        </button>
        <p>You will be asked to auhtenticate again to conform the changes.</p>
      </div>
      <Toaster />
    </section>
  );
}
