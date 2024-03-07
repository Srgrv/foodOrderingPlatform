import React from "react";

//components
import { Button } from "./ui/button";

const MainNav: React.FC = () => {
  return (
    <Button
      variant="ghost"
      className="font-bold hover:text-orange-500 hover:bg-white"
    >
      Log In
    </Button>
  );
};

export default MainNav;
