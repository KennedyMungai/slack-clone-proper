"use client";

import { useState } from "react";
import { SignInFlow } from "@/features/auth/types";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="md:h-auto md:w-[420px]">Auth Screen</div>
    </div>
  );
};
