import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Model from "./Model";

interface entityInterface {
  note: string;
  createdAt: string;
  desc: string;
  _id: string;
}

interface entityInter {
  entity: entityInterface;
  getValue: () => void;
}

export default function NotesComp({ entity, getValue }: entityInter) {
  const [isActive, setIsActive] = useState(false);
  const [activeModel, setActiveModel] = useState(false);
  const handleDelete = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    const data = {
      id: entity._id,
    };
    try {
      const response = await fetch("/api/note", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response);
      toast.success("Your note has been deleted");
      getValue();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const undoModel = () => {
    setActiveModel(false);
  };
  return (
    <>
      {activeModel && (
        <Model entity={entity} getValue={getValue} undoModel={undoModel} />
      )}
      <div
        className="bg-white my-5 rounded-lg p-3"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="flex items-center justify-between note-point">
          <h3 className="font-semibold">{entity.note}</h3>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-sm text-gray-700">
              {entity.createdAt.split("T")[0]}
            </span>

            <button
              className="bg-rose-700 text-white rounded-full p-1"
              onClick={handleDelete}
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            <button
              className="bg-rose-700 text-white rounded-full p-1"
              onClick={() => setActiveModel(!activeModel)}
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
            </button>
          </div>
        </div>
        {isActive && (
          <div className={"text-sm text-gray-700"}>{entity.desc}</div>
        )}
      </div>
    </>
  );
}
