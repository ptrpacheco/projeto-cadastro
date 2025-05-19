import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const CrudContainer = ({ children }: ContainerProps) => {
  return (
    <div className="flex-1 p-8 bg-background overflow-hidden">
      <div className="h-full flex flex-col bg-white rounded-lg shadow-xl border border-gray">
        <div className="h-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CrudContainer;