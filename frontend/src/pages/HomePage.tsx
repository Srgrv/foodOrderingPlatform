import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tighter text-orange-500">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>
    </div>
  );
};

export default HomePage;
