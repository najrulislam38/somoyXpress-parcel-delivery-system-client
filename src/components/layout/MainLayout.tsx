import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface IPros {
  children: ReactNode;
}

export default function MainLayout({ children }: IPros) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
