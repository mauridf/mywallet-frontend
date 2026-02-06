import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded shadow p-4">
      {children}
    </div>
  );
}
