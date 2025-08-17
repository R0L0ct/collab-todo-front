"use client";

import { getTasks, updateTask } from "@/api/data";
import { taskAtom } from "@/store/store";
import { useAtom } from "jotai";
import { Check, Square } from "lucide-react";
import { useEffect, useState } from "react";
import NewTask from "./NewTask";

interface TASK {
  id: number;
  task: string;
  isCompleted: boolean;
}

const Todo = () => {
  const [tasks, setTasks] = useState<TASK[] | null>(null);
  const [taskBooleanAtom, setTaskBooleanAtom] = useAtom(taskAtom);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await getTasks();
        if (response) {
          setTasks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllTasks();
  }, []);

  const handleChange = async (id: number, checked: boolean) => {
    try {
      if (tasks) {
        await updateTask(id, { isCompleted: !checked });
        const updatedTasks = tasks.map((t) => {
          if (t.id === id) {
            return { ...t, isCompleted: !checked };
          }
          return t;
        });
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 rounded min-w-[800px]">
      {taskBooleanAtom && <NewTask />}
      <div className="font-bold text-[#F4F6F7] flex justify-center py-5">
        <button
          onClick={() => setTaskBooleanAtom(true)}
          className="bg-orange-700 rounded-md p-2 cursor-pointer"
        >
          Nueva Tarea
        </button>
      </div>
      {tasks &&
        tasks.map((t) => {
          return (
            <div
              key={t.id}
              className="text-[#F4F6F7] flex justify-between w-full border rounded p-3"
            >
              <div className="font-bold text-[#FF69B4]">{t.id}</div>
              <div className="">{t.task}</div>
              <button
                className="cursor-pointer"
                onClick={() => handleChange(t.id, t.isCompleted)}
              >
                {t.isCompleted ? (
                  <Square />
                ) : (
                  <Check className="text-[#B2FF59]" />
                )}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Todo;
