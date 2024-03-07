import React from "react";

//components
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type TProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">{children}</div>
    </div>
  );
};

export default Layout;
