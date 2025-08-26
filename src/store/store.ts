import { atom } from "jotai";

interface TASK {
  id: number;
  task: string;
  isCompleted: boolean;
  user: { username: string };
}

interface Auth {
  user: { username: string; userId: number };
  access_token: string;
}

export const taskAtom = atom<boolean>(false);
export const tasksAtom = atom<TASK[]>([]);
export const authAtom = atom<Auth | null>(null);
