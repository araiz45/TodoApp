import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface entityInterface {
  note: string;
  createdAt: string;
  desc: string;
  _id: string;
}

interface entityInter {
  entity: entityInterface;
  getValue: () => void;
  undoModel: () => void;
}

export default function Model({ entity, getValue, undoModel }: entityInter) {
  const [note, setNote] = useState<string>(entity.note || "");
  const [desc, setDesc] = useState<string>(entity.desc || "");
  const handleEdit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = {
      note,
      desc,
      id: entity._id,
    };
    try {
      const response = await fetch("/api/note", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response);
      undoModel();
      getValue();
      toast.success("Note has been updated");
    } catch (error) {}
  };
  return (
    <div className="fixed min-h-screen top-0 left-0 flex justify-center items-center w-full bg-[#06060627]">
      <form
        action=""
        className="flex flex-col gap-2 bg-gray-200 py-10 px-20 rounded-lg"
        onSubmit={handleEdit}
      >
        <label htmlFor="" className="">
          Enter Title
        </label>
        <input
          type="text"
          className="py-2 px-3 rounded-md outline-none border-2 border-black"
          value={note}
          onChange={(ev) => setNote(ev.target.value)}
        />
        <label htmlFor="">Enter Description</label>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          className="py-3 px-2 rounded-md border-black border-2 outline-none"
          value={desc}
          onChange={(ev) => setDesc(ev.target.value)}
        ></textarea>
        <button
          className="bg-rose-700 text-white py-2 px-3 rounded-md flex justify-center items-center gap-1"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          Update
        </button>
        <button
          className="bg-rose-700 text-white py-2 px-3 rounded-md flex justify-center items-center"
          onClick={() => undoModel()}
        >
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
          Close
        </button>
      </form>
    </div>
  );
}
