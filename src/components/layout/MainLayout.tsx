import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IPros {
  children: ReactNode;
}

export default function MainLayout({ children }: IPros) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}
