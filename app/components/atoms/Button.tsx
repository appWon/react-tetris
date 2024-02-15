import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  size?: string;
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="absolute text-yellow-300 font-main select-none bottom-[10%] left-[50%] translate-x-[-50%] translate-y-[0] text-5xl whitespace-nowrap hover:cursor-pointer"
      {...props}
    />
  );
};
