import React from "react";
import NavBar from "../components/NavBar";

const Index = () => {
  return (
    <div className="w-[100%] h-screen flex  align-middle flex-col">
      <NavBar />
      <div className="flex justify-center align-middle">
        <div className="chat chat-end">
          <div className="chat-bubble bg-white hover:scale-125 hover:transition-all hover:ease-in-out hover:duration-200 text-black font-semibold">
            Select a category first!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
