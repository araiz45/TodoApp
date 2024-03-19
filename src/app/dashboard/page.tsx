"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import NotesComp from "@/components/Notes";

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
        const response = await fetch(process.env.serverUrl + "/dashboard");
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
    const res = await fetch(process.env.serverUrl + "/note", {
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
      <Form id={id} username={username} getValue={getValue} />
      <div className="min-h-screen px-20">
        <h2 className="text-2xl text-center mt-20 font-bold">Your Notes</h2>
        {dataArr?.map((entity) => (
          <NotesComp entity={entity} getValue={getValue} />
        ))}
      </div>
    </section>
  );
}
