"use client";

import { taskAtom } from "@/store/store";
import { useAtom } from "jotai";

const NewTask = () => {
  const [taskBooleanAtom, setTaskBooleanAtom] = useAtom(taskAtom);
  return (
    <div className="fixed top-0 z-10 w-[500px] h-[500px] bg-white rounded">
      <button
        className="cursor-pointer"
        onClick={() => {
          setTaskBooleanAtom(false);
        }}
      >
        Cerrar
      </button>
    </div>
  );
};

export default NewTask;
