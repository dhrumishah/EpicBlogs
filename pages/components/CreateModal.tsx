import React, { useState } from "react";

type Props = {};

const CreateModal = (props: Props) => {
  const [showModal, setShowModal] = useState(true);
  return (
    <div className="">
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-2 border-[#86C232] rounded-lg relative flex flex-col w-full bg-[#474B4F] p-6">
                <div className="flex justify-between text-center gap-8">
                  <h1 className="text-xl text-[#86C232] font-bold">
                    Blog Details
                  </h1>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-white h-6 w-4 items-center text-xl  py-0 ">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="w-full">
                    <label className="block text-white text-md mb-1">
                      Blog Title
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6" />
                    <label className="block text-white text-md mb-1">
                      Blog Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6" />
                    <button
                      className="w-full text-white bg-[#86C232] active:bg-[#61892F] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CreateModal;
