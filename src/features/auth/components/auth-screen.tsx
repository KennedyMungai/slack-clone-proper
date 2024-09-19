"use client";

import SignInCard from "@/components/signin-card";
import SignUpCard from "@/components/signup-card";
import { SignInFlow } from "@/features/auth/types";
import { useState } from "react";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" && <SignInCard setState={setState} />}
        {state === "signUp" && <SignUpCard setState={setState} />}
      </div>
    </div>
  );
};
