import React from "react";
import { FcReading } from "react-icons/fc";
import { useSetRecoilState } from "recoil";
import { modalAtom, modalInfoAtom } from "../atoms/atom";

const InfoCardCourse = ({ data }) => {
  const setModal = useSetRecoilState(modalAtom);
  const setModalInfo = useSetRecoilState(modalInfoAtom);

  return (
    data && (
      <div
        onClick={() => {
          setModalInfo(data);
          setModal(true);
        }}
        key={data.subjectId}
        className="grid grid-cols-3 gap-1 hover:scale-110  bg-white p-3 rounded-2xl border-solid border-4 border-gray-300"
      >
        <div className="col-span-3">
          <FcReading size={30} />
        </div>
        <div className="col-span-3 text-xl text-black">{data.name}</div>
      </div>
    )
  );
};

export default InfoCardCourse;
