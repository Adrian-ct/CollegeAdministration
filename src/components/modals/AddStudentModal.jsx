import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { addModalAtom, entitiesAtom } from "../../atoms/atom";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
const AddStudentModal = () => {
  const [groups, setGroups] = useState([]);
  const [entities, setEntities] = useRecoilState(entitiesAtom);

  useState(() => {
    axios.get("https://localhost:7280/api/Groups").then((res) => {
      setGroups(res.data);
    });
  }, []);
  const [modal, setModal] = useRecoilState(addModalAtom);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    cnp: "",
    email: "",
    groupId: "",
    active: false,
    group: {},
    notes: [],
  });

  const closeModal = () => {
    setModal(false);
  };
  const saveStudent = () => {
    console.log(student);
    axios.post("https://localhost:7280/api/Students", student).then(
      (response) => {
        console.log(response);
        setEntities([...entities, student]);
        setStudent({});
      },
      (error) => {
        console.log(error);
      }
    );
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
                Add a student
              </Dialog.Title>

              <div className="mt-2 grid gap-3  grid-rows-6 grid-cols-4">
                <input
                  type="text"
                  value={student.firstName}
                  placeholder="First Name"
                  onChange={(e) =>
                    setStudent({ ...student, firstName: e.target.value })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="text"
                  value={student.lastName}
                  placeholder="Last Name"
                  onChange={(e) =>
                    setStudent({ ...student, lastName: e.target.value })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="number"
                  value={student.cnp}
                  placeholder="CNP"
                  onChange={(e) =>
                    e.target.value.length <= 13 &&
                    setStudent({ ...student, cnp: e.target.value })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />
                <input
                  type="email"
                  value={student.email}
                  placeholder="Email"
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      email: e.target.value,
                    })
                  }
                  className="placeholder:text-gray-300 input col-span-2 bg-purple-600 text-white w-full max-w-xs"
                />

                <select
                  defaultValue="Inactive"
                  className="select w-full max-w-xs col-span-2 bg-purple-600 text-white"
                  onChange={(e) => {
                    let value = e.target.value === "Active" ? true : false;
                    setStudent({ ...student, active: value });
                  }}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="col-span-4 row-span-3 overflow-scroll">
                  <Multiselect
                    showCheckbox
                    selectionLimit={1}
                    placeholder="Select a group"
                    options={groups} // Options to display in the dropdown
                    onSelect={(selectedList, selectedItem) => {
                      console.log(selectedItem);
                      setStudent({
                        ...student,
                        groupId: selectedItem.id,
                        group: selectedItem,
                      });
                    }} // Function will trigger on select event
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
                  onClick={saveStudent}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-white bg-green-400 hover:bg-green-600 border border-transparent rounded-md "
                >
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddStudentModal;
