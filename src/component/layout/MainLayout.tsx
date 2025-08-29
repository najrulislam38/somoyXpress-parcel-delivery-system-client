import type { ReactNode } from "react";

interface IPros {
  children: ReactNode;
}

export default function MainLayout({ children }: IPros) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
