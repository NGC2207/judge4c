import { create } from "zustand";
import { CreateOrgOption } from "gitea-js";

const createSetters = <T extends object>(set: (state: T) => void) => {
  return (key: keyof T) => (value: T[keyof T]) => set({ [key]: value } as T);
};

const useOrgsPostStore = create<
  CreateOrgOption & {
    set: (
      key: keyof CreateOrgOption,
      value: CreateOrgOption[keyof CreateOrgOption]
    ) => void;
  }
>((set) => {
  const setters = createSetters<CreateOrgOption>(set);

  return {
    description: "",
    email: "",
    full_name: "",
    location: "",
    repo_admin_change_team_access: false,
    username: "",
    visibility: "public",
    website: "",
    set: (key, value) => setters(key)(value),
  };
});

export default useOrgsPostStore;
