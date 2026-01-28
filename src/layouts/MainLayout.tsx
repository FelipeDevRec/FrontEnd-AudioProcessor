import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {children}
    </div>
  );
};
