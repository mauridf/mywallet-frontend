import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded bg-black text-white hover:opacity-90 disabled:opacity-50 ${props.className || ""}`}
    >
      {children}
    </button>
  );
}
