import { create } from "zustand";
import { CreateFileOptions } from "gitea-js";

const createSetters = <T extends object>(set: (state: T) => void) => {
  return (key: keyof T) => (value: T[keyof T]) => set({ [key]: value } as T);
};

const repoCreateFileStore = create<
  CreateFileOptions & {
    set: (
      key: keyof CreateFileOptions,
      value: CreateFileOptions[keyof CreateFileOptions]
    ) => void;
  }
>((set) => {
  const setters = createSetters<CreateFileOptions>(set);
  return {
    content: "",
    set: (key, value) => setters(key)(value),
  };
});

export default repoCreateFileStore;
