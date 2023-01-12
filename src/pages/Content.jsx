import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import {
  getAddModalType,
  getEntityType,
  getModalType,
  getUrl,
} from "../utils/helpers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { addModalAtom, entitiesAtom } from "../atoms/atom";

const Content = () => {
  const [param] = useSearchParams();
  const [params, setParams] = useState();
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const [filteredEntities, setFilteredEntities] = useState(entities);
  const setAddModal = useSetRecoilState(addModalAtom);

  if (param !== params) setParams(param);

  useEffect(() => {
    console.log("Fetch");
    const url = getUrl(param.get("type"));
    axios.get(url).then((res) => {
      setEntities(res.data);
      setFilteredEntities(res.data);
    });
  }, [params]);

  useEffect(() => {
    console.log("Changed");

    setFilteredEntities(entities);
  }, [entities]);

  const handleSearch = (event) => {
    const query = event.target.value;
    console.log(query);

    const searchList = entities.filter((item) => {
      let fullName;
      if (param.get("type") === "Courses") fullName = item.name;
      else fullName = `${item.firstName} ${item.lastName}`;

      return fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredEntities(searchList);
  };

  return (
    <div className=" h-screen  flex align-middle flex-col">
      {getModalType(param.get("type"))}
      {getAddModalType(param.get("type"))}
      <NavBar />
      <div className="grid overflow-auto grid-cols-5 pt-4 pb-6 gap-3 mx-[10%] px-[5%]  max-h-screen ">
        <div className="col-span-full">
          <div className="w-full flex justify-center gap-10 ">
            <input
              type="text"
              onChange={handleSearch}
              placeholder={`Search ${param.get("type")}`}
              className="input border-2 input-bordered input-info text-white bg-blue-900 w-full max-w-xs"
            />
            <button
              onClick={() => {
                setAddModal(true);
              }}
              className="btn btn-accent w-fit"
            >
              Add {param.get("type")}
            </button>
          </div>
        </div>
        {params &&
          filteredEntities.map((x) => {
            return <>{getEntityType(params.get("type"), x)} </>;
          })}
      </div>
    </div>
  );
};

export default Content;
