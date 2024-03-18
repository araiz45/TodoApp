"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
    const submitData = { username, password };
    try {
      const response = await fetch(process.env.serverUrl + "/register", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        console.log("good");
        setPassword("");
        setUsername("");
        push("/dashboard");
      } else if (response.status === 400) {
        toast.error("User already Exist");
      } else {
        console.log("another bad");
      }
    } catch (error: any) {
      console.log("bad");
      toast.error("Some error occrued");
    }
  };
  return (
    <section className="bg-gray-300 min-h-screen flex justify-center items-center">
      <form
        className="flex flex-col gap-1 bg-white py-10 px-20 rounded-md shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-black text-center mb-4">
          Register
        </h1>
        <label htmlFor="name" className="">
          Enter Username
        </label>
        <input
          type="text"
          className="border-black border-2 py-2 px-3 outline-none rounded-md"
          name="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="name" className="">
          Enter Password
        </label>
        <input
          type="password"
          name=""
          id=""
          className="border-black border-2 py-2 px-3 outline-none rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-rose-700 py-2 px-3 rounded-md shadow-md text-white"
        >
          Register
        </button>
        <p>
          Have an account{" "}
          <Link href={"/login"} className="underline text-rose-700">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
