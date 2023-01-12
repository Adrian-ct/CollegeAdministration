import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
const HeaderCard = (props) => {
  const navigate = useNavigate();

  let name = props.imagePath;
  name = name.split("/")[1].split(".")[0];
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const navToContent = () => {
    navigate({
      pathname: "/content",
      search: createSearchParams({
        type: name,
      }).toString(),
    });
  };
  return (
    <div
      key={props.id}
      className="card-compact w-60 bg-blue-900  hover:bg-blue-600 shadow-xl glass rounded-lg"
    >
      <figure>
        <img
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
          src={props.imagePath}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{name}</h2>
        <div className="card-actions">
          <button className="btn btn-primary w-full" onClick={navToContent}>
            Manage {name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
