import { create } from "zustand";
import { CreateUserOption } from "gitea-js";

const createSetters = <T extends object>(set: (state: T) => void) => {
  return (key: keyof T) => (value: T[keyof T]) => set({ [key]: value } as T);
};

const adminCreateUserStore = create<
  CreateUserOption & {
    set: (
      key: keyof CreateUserOption,
      value: CreateUserOption[keyof CreateUserOption]
    ) => void;
  }
>((set) => {
  const setters = createSetters<CreateUserOption>(set);
  return {
    visibility: "public",
    username: "",
    email: "",
    password: "",
    must_change_password: true,
    set: (key, value) => setters(key)(value),
  };
});

export default adminCreateUserStore;
