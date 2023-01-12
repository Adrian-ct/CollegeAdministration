import React from "react";
import { AiFillAppstore } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar bg-purple-900 ">
        <div className="navbar-start">
          <button
            className="btn gap-2 hover:bg-primary"
            onClick={() => navigate("/")}
          >
            <AiFillAppstore size="1.5rem" />
            College Administration
          </button>
        </div>
      </div>
      <div className="flex justify-center align-middle bg-primary">
        <Dashboard />
      </div>
    </>
  );
};

export default NavBar;
