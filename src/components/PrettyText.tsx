import { ComponentProps, ReactNode } from "react";

interface PrettyProps extends ComponentProps<"p"> {
  children: ReactNode;
  className?: string;
}

export const PrettyText = ({ children, className, ...props }: PrettyProps) => {
  const baseClass =
    "flex justify-center p-16 m-auto text-center align-middle h-96 size-9/12";
  return (
    <div className={baseClass + " " + className}>
      <p className="m-auto text-2xl opacity-75" {...props}>{children}</p>
    </div>
  );
};
