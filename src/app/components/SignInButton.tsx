"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => {
        signIn("google", { callbackUrl: "/dashboard" });
      }}
      className="px-4 py-2 hover:underline  rounded underline-offset-1 text-black transition-all"
    >
      Sign In with Google
    </button>
  );
}
