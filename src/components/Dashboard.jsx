import React from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { counterAtom } from "../atoms/atom";
import HeaderCard from "./HeaderCard";

const paths = ["/students.jpg", "/professors.jpg", "/courses.jpg"];

const Dashboard = () => {
  // const count = useRecoilValue(counterAtom);
  // const setCount = useSetRecoilState(counterAtom);
  return (
    <>
      <div className="flex justify-between align-middle h-fit my-5 w-[70%]">
        {paths.map((e) => {
          return <HeaderCard imagePath={e} id={e} />;
        })}
      </div>
      {/* {count} */}
    </>
  );
};

export default Dashboard;
