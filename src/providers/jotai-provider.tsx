"use client";

import { Provider } from "jotai";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const JotaiProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
