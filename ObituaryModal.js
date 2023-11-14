import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
const ObituaryModal = ({ visibility, setVisibility, refreshObituaries }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [deathYear, setDeathYear] = useState("");
  const cancelButtonRef = useRef(null);
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [creatingObituaryLoading, setCreatingObituaryLoading] = useState(false);

  const handleImageSelect = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleWriteObituary = () => {
    setCreatingObituaryLoading(true);
    // posting obituary to database, posting in json format
    fetch("http://localhost:5000/create-obituary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        birthYear,
        deathYear,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreatingObituaryLoading(false);
        setVisibility(false);
        refreshObituaries();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={visibility} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setVisibility}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <img
                        src="/gifs/checklist.gif"
                        className="rounded"
                        alt="create new obituary"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      ></Dialog.Title>
                      <div className="mt-2 w-full">
                        <div className="text-sm mt-8 w-full text-gray-500 flex flex-col gap-4 justify-center items-center">
                          <input
                            id="fileInput"
                            type="file"
                            name="image"
                            className="hidden"
                            placeholder="Select image"
                            onChange={handleImageChange}
                          />
                          <div
                            className=" text-sm text-blue-600 cursor-pointer"
                            onClick={handleImageSelect}
                          >
                            {image
                              ? imageName
                              : "Select an image for the obituary"}
                          </div>
                          <input
                            type="text"
                            name="name"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            placeholder="Name"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            value={name}
                          />
                          <div>
                            <input
                              type="date"
                              name="birth_year"
                              placeholder="Birth Year"
                              value={birthYear}
                              onChange={(e) => {
                                setBirthYear(e.target.value);
                              }}
                            />
                            <input
                              type="date"
                              name="death_year"
                              placeholder="Death Year"
                              value={deathYear}
                              onChange={(e) => {
                                setDeathYear(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <div
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm sm:mt-0 "
                  >
                    <Button
                      text={"Write Obituary"}
                      handler={handleWriteObituary}
                      loading={creatingObituaryLoading}
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md hover:bg-slate-500 px-3 py-2 text-sm font-semibold text-black shadow-sm sm:ml-3 sm:w-auto"
                    onClick={() => setVisibility(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ObituaryModal;
