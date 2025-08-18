import { atom } from "jotai";

interface TASK {
  id: number;
  task: string;
  isCompleted: boolean;
}

export const taskAtom = atom<boolean>(false);
export const tasksAtom = atom<TASK[]>([]);
