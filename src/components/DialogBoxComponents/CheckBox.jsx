import React from "react";
import { BsCheck } from "react-icons/bs";

function CheckBox({ label, state, setState }) {
  return (
    <div className="flex items-center">
      <label htmlFor="id" className="text-xs mr-2">
        {label}
      </label>
      <div
        className={`${
          state ? "bg-first" : "bg-white"
        } border border-gray-300 flex justify-center items-center rounded-full h-[25px] w-[25px] cursor-pointer`}
        style={{ minWidth: "25px" }} // Ensure minimum width for checkbox
        onClick={() => setState(!state)}
      >
        {state && <BsCheck className="text-2xl text-white" />}
      </div>
    </div>
  );
}

export default CheckBox;
