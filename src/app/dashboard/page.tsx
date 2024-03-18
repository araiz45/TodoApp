"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

interface gettingDataInterface {
  _id: string;
  note: string;
  desc: string;
  userId: string;
}
export default function DashboardPage() {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [dataArr, setDataArr] = useState<gettingDataInterface[]>();
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

  useEffect(() => {
    (async () => {
      const res = await fetch(process.env.serverUrl + "/note", {
        method: "GET",
      });
      const { data } = await res.json();
      setDataArr(data);
    })();
  }, []);
  return (
    <section className="min-h-screen bg-gray-300">
      <Form id={id} username={username} />
      <div className="min-h-screen px-20">
        <h2 className="text-2xl text-center mt-20 font-bold">Your Notes</h2>
        {dataArr?.map((entity) => (
          <div className="text-black bg-white my-5 rounded-lg">
            <div className="">Title: {entity.note}</div>
            <div className="text-gray-400">Description: {entity.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
