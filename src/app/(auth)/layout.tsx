import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row w-full justify-center items-center h-[100vh]">
      {children}
    </div>
  );
};

export default AuthLayout;
