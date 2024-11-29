import { create } from "zustand";
import { CreateRepoOption } from "gitea-js";

const createSetters = <T extends object>(set: (state: T) => void) => {
  return (key: keyof T) => (value: T[keyof T]) => set({ [key]: value } as T);
};

const useRepoPostStore = create<
  CreateRepoOption & {
    org: string;
    set: (
      key: keyof CreateRepoOption | "org",
      value: CreateRepoOption[keyof CreateRepoOption] | string
    ) => void;
  }
>((set) => {
  const setters = createSetters<CreateRepoOption & { org: string }>(set);

  return {
    auto_init: false,
    default_branch: "main",
    description: "",
    gitignores: "",
    issue_labels: "",
    license: "",
    name: "",
    object_format_name: "sha1",
    private: false,
    readme: "",
    template: false,
    trust_model: "default",
    org: "",
    set: (key, value) => setters(key)(value),
  };
});

export default useRepoPostStore;
