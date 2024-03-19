import Login from "@/components/Login";
import Register from "@/components/Register";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className="min-h-screen bg-center bg-cover bg-no-repeat flex justify-center flex-col"
      style={{ background: "url('/bg.jpg')" }}
    >
      <h1 className="text-white text-7xl font-bold leading-relaxed page-heading">
        Take Notes <span className="bg-rose-700">So</span> <br />
        You Can Remember <br />
        Everything
      </h1>
      <div className="flex items-center gap-3 w-[33rem] button-between">
        <Link
          href={"/login"}
          className="bg-transparent border-2 border-rose-700 text-rose-700 py-2 px-3 rounded-md flex justify-center items-center w-1/2 hover:bg-rose-700 transition-colors duration-100 hover:text-white"
        >
          Login
        </Link>
        <Link
          href={"/register"}
          className="bg-transparent border-2 border-rose-700 text-rose-700 py-2 px-3 rounded-md flex justify-center items-center w-1/2 hover:bg-rose-700 transition-colors duration-100 hover:text-white"
        >
          Register
        </Link>
      </div>
    </section>
  );
}
