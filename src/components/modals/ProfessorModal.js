import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import { entitiesAtom, modalAtom, modalInfoAtom } from "../../atoms/atom";

const ProfessorModal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [professor, setProfessor] = useRecoilState(modalInfoAtom);
  const [entities, setEntities] = useRecoilState(entitiesAtom);

  const closeModal = () => {
    setModal(false);
  };
  const saveProfessor = () => {
    console.log(professor);
  };
  const deleteProfessor = () => {
    axios
      .delete("https://localhost:7280/api/Professors/" + professor.id)
      .then(() => {
        let values = [...entities];
        const index = values.findIndex((item) => item.id === professor.id);
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
                Edit the professor
              </Dialog.Title>

              <div className="mt-2 grid gap-3  grid-rows-6 grid-cols-4">
                <input
                  type="text"
                  value={professor.firstName}
                  placeholder="First Name"
                  onChange={(e) =>
                    setProfessor({ ...professor, firstName: e.target.value })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="text"
                  value={professor.lastName}
                  placeholder="Last Name"
                  onChange={(e) =>
                    setProfessor({ ...professor, lastName: e.target.value })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="number"
                  value={professor.cnp}
                  placeholder="CNP"
                  onChange={(e) =>
                    setProfessor({ ...professor, cnp: e.target.value })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="number"
                  value={professor.employmentYear}
                  placeholder="Employment Year"
                  onChange={(e) =>
                    setProfessor({
                      ...professor,
                      employmentYear: e.target.value,
                    })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="text"
                  value={professor.telephone}
                  onChange={(e) =>
                    setProfessor({
                      ...professor,
                      telephone: e.target.value,
                    })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />

                <select
                  className="select w-full max-w-xs col-span-2 bg-purple-600 text-white"
                  onChange={(e) => {
                    let value = e.target.value === "Active" ? true : false;
                    setProfessor({ ...professor, active: value });
                  }}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="col-span-4 row-span-3 overflow-scroll">
                  <Multiselect
                    selectionLimit={0}
                    placeholder="Courses"
                    options={professor.subjects} // Options to display in the dropdown
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
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
                  onClick={saveProfessor}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                  onClick={deleteProfessor}
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

export default ProfessorModal;
