import React, { useState } from "react";
import { toast } from "react-toastify";

interface getProp {
  id: string;
  username: string;
}
export default function Form({ id, username }: getProp) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(title, desc, id);
    const data = {
      title,
      desc,
      userId: id,
    };
    try {
      const response = await fetch(process.env.serverUrl + "/note", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        setTitle("");
        setDesc("");
        toast.success("Note has been added successfully");
      }
    } catch (error) {}
  };
  return (
    <div className="flex justify-center items-center flex-col py-3">
      <h2 className="text-2xl font-bold">Add a Note</h2>
      <form className="flex flex-col w-96 gap-2 " onSubmit={handleSubmit}>
        <label htmlFor="title" className="">
          Enter Title
        </label>
        <input
          type="text"
          className="border-2 border-black py-2 px-3 outline-none rounded-md"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          name="title"
        />
        <label htmlFor="desc" className="">
          Enter Description
        </label>
        <textarea
          name="desc"
          id=""
          cols={30}
          rows={10}
          className="border-2 border-black py-2 px-3 outline-none rounded-md"
          value={desc}
          onChange={(ev) => setDesc(ev.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-rose-700 text-white py-2 px-2 rounded-md flex justify-center items-center gap-1"
        >
          Add Note
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 font-bold text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
