import Link from "next/link";

export default function Login() {
  return (
    <section className="bg-gray-300 min-h-screen flex justify-center items-center">
      <form className="flex flex-col gap-1 bg-white py-10 px-20 rounded-md shadow-lg">
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
        />
        <label htmlFor="name" className="">
          Enter Password
        </label>
        <input
          type="password"
          name=""
          id=""
          className="border-black border-2 py-2 px-3 outline-none rounded-md"
        />
        <button
          type="submit"
          className="bg-rose-700 py-2 px-3 rounded-md shadow-md text-white"
        >
          Login
        </button>
        <p>
          Don't have an account{" "}
          <Link href={"/register"} className="underline text-rose-700">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
