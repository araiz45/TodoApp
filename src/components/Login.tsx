"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = {
      username,
      password,
    };
    try {
      const response = await fetch(process.env.serverUrl + "/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setUsername("");
      setPassword("");
      push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-gray-300 min-h-screen flex justify-center items-center">
      <form
        className="flex flex-col gap-1 bg-white py-10 px-20 rounded-md shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-black text-center mb-4">
          Login
        </h1>
        <label htmlFor="name" className="">
          Enter Username
        </label>
        <input
          type="text"
          className="border-black border-2 py-2 px-3 outline-none rounded-md"
          name="name"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
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
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="submit"
          className="bg-rose-700 py-2 px-3 rounded-md shadow-md text-white"
        >
          Login
        </button>
        <p>
          Don&apos;t have an account{" "}
          <Link href={"/register"} className="underline text-rose-700">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
