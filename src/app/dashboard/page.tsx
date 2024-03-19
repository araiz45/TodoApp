"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import NotesComp from "@/components/Notes";
import LogoutButton from "@/components/Logout";

interface gettingDataInterface {
  _id: string;
  note: string;
  desc: string;
  userId: string;
  createdAt: string;
}
export default function DashboardPage() {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [dataArr, setDataArr] = useState<gettingDataInterface[]>();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/dashboard");
        const { name, id } = await response.json();
        console.log(name, id);
        setUsername(name);
        setId(id);
        if (response.status === 401) {
          push("/login");
        }
        if (name === undefined || id === undefined) {
          push("/login");
        }
      } catch (error) {
        console.log("dones");
        push("/login");
      }
    })();
  }, []);
  const getValue = async () => {
    const res = await fetch("/api/note", {
      method: "GET",
    });
    const { data } = await res.json();
    setDataArr(data);
  };
  useEffect(() => {
    getValue();
  }, []);
  return (
    <section className="min-h-screen bg-gray-300">
      <LogoutButton />
      <Form id={id} username={username} getValue={getValue} />
      <div className="min-h-72 px-20 py-16">
        <h2 className="text-2xl text-center mt-20 font-bold">
          Hi{" "}
          <span className="bg-rose-700 py-2 px-1 rounded-lg text-white form-heading">
            {username}
          </span>{" "}
          👋 ,Here Is Your Notes
        </h2>
        {dataArr?.map((entity, index) => (
          <NotesComp entity={entity} getValue={getValue} key={index} />
        ))}
      </div>
    </section>
  );
}
