"use client";

import { createTask } from "@/api/data";
import { taskAtom, tasksAtom } from "@/store/store";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

interface TASK {
  id: number;
  task: string;
  isCompleted: boolean;
}

const NewTask = () => {
  const [task, setTask] = useState<string>("");
  const setTaskAtom = useSetAtom(taskAtom);
  const [tasks, setNewTask] = useAtom<TASK[]>(tasksAtom);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { task: task };
      const response = await createTask(data);
      if (response) {
        setTaskAtom(false);
        const newTask = {
          id: response.data.id,
          task: response.data.task,
          isCompleted: response.data.isCompleted,
        };
        const newTaskArray = [...tasks, newTask];
        setNewTask(newTaskArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed z-20 bg-white rounded">
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          className="p-3 min-w-[500px]"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          name="Crear"
          type="submit"
          className="cursor-pointer px-2 border-l font-bold text-green-700"
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewTask;
