import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 md:px-8 lg:px-16 py-6">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};
