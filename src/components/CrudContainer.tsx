import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const CrudContainer = ({ children }: ContainerProps) => {
  return (
    <div className="size-full p-8 bg-background">
      <div className="size-full flex flex-col bg-white rounded-lg shadow-xl border border-gray">
        <div className="size-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CrudContainer;