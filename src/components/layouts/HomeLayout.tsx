import React, { ReactNode } from "react";


interface LoginLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div>
      <header>Header Content</header>
      <aside>Sidebar Content</aside>
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;