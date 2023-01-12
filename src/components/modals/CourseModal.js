import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { entitiesAtom, modalAtom, modalInfoAtom } from "../../atoms/atom";

const CourseModal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [subjects, setSubjects] = useRecoilState(modalInfoAtom);
  const [entities, setEntities] = useRecoilState(entitiesAtom);

  const closeModal = () => {
    setModal(false);
  };
  const deleteCourse = () => {
    axios
      .delete("https://localhost:7280/api/Subjects/" + subjects.subjectId)
      .then((r) => {
        let values = [...entities];
        const index = values.findIndex(
          (item) => item.subjectId === entities.id
        );
        values.splice(index, 1);
        setEntities(values);
      });
    closeModal();
  };
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Edit the course
              </Dialog.Title>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-white bg-gray-500 border border-transparent rounded-md "
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                  onClick={deleteCourse}
                >
                  Delete
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CourseModal;
