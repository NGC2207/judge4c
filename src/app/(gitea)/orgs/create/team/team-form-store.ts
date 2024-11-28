import { create } from "zustand";
import { CreateTeamOption, Organization } from "gitea-js";

const createSetters = <T extends object>(set: (state: T) => void) => {
  return (key: keyof T) => (value: T[keyof T]) => set({ [key]: value } as T);
};

const useTeamsPostStore = create<
  CreateTeamOption & {
    organizations: Organization[];
    selectedOrg: string;
    set: (
      key: keyof CreateTeamOption,
      value: CreateTeamOption[keyof CreateTeamOption]
    ) => void;
    setOrganizations: (organizations: Organization[]) => void;
    setSelectedOrg: (org: string) => void;
  }
>((set) => {
  const setters = createSetters<CreateTeamOption>(set);

  return {
    name: "",
    description: "",
    permission: "read",
    organizations: [],
    selectedOrg: "",
    set: (key, value) => setters(key)(value),
    setOrganizations: (organizations) => set({ organizations }),
    setSelectedOrg: (selectedOrg) => set({ selectedOrg }),
  };
});

export default useTeamsPostStore;
