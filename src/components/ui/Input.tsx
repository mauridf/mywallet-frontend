import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
  return (
    <input
      {...props}
      className={`w-full border p-2 rounded ${props.className || ""}`}
    />
  );
}
