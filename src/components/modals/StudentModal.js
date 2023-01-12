import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import { entitiesAtom, modalAtom, modalInfoAtom } from "../../atoms/atom";

const StudentModal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const [modalInfo, setModalInfo] = useRecoilState(modalInfoAtom);
  const closeModal = () => {
    setModal(false);
  };
  const saveModal = () => {
    axios
      .put("https://localhost:7280/api/Students/" + modalInfo.id, modalInfo)
      .then((response) => {
        const index = entities.findIndex((item) => item.id === modalInfo.id);
        let newEntities = [...entities];
        newEntities[index] = { ...modalInfo };

        setEntities(newEntities);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteStudent = () => {
    axios
      .delete("https://localhost:7280/api/Students/" + modalInfo.id)
      .then(() => {
        let values = [...entities];
        const index = values.findIndex((item) => item.id === modalInfo.id);
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
                {`Edit student ${
                  modalInfo.firstName + " " + modalInfo.lastName
                }`}
              </Dialog.Title>

              <div className="mt-2 grid gap-3  grid-cols-4">
                <input
                  type="text"
                  value={modalInfo.firstName}
                  onChange={(e) =>
                    setModalInfo({ ...modalInfo, firstName: e.target.value })
                  }
                  className="input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="text"
                  value={modalInfo.lastName}
                  onChange={(e) =>
                    setModalInfo({ ...modalInfo, lastName: e.target.value })
                  }
                  className="input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="text"
                  value={modalInfo.email}
                  onChange={(e) =>
                    setModalInfo({ ...modalInfo, email: e.target.value })
                  }
                  className="input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <select
                  defaultValue={modalInfo.active ? "Active" : "Inactive"}
                  className="select w-full max-w-xs col-span-2 bg-purple-600 text-white"
                  onChange={(e) => {
                    let value = e.target.value === "Active" ? true : false;
                    setModalInfo({ ...modalInfo, active: value });
                  }}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <input
                  type="text"
                  value={modalInfo.cnp}
                  onChange={(e) =>
                    setModalInfo({ ...modalInfo, cnp: e.target.value })
                  }
                  className="input bg-purple-600 col-span-2 w-min text-white  max-w-xs"
                />
              </div>

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
                  className="inline-flex justify-center px-4 py-2 text-sm text-white bg-green-400 hover:bg-green-600 border border-transparent rounded-md "
                  onClick={saveModal}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                  onClick={deleteStudent}
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

export default StudentModal;
