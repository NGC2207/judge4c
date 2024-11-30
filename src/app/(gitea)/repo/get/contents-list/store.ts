import { create } from "zustand";

interface GetContentsListState {
  owner: string;
  repo: string;
  set: <K extends keyof GetContentsListState>(
    key: K,
    value: GetContentsListState[K]
  ) => void;
  reset: () => void;
}

export type { GetContentsListState };

const initialState: GetContentsListState = {
  owner: "",
  repo: "",
  set: () => {},
  reset: () => {},
};

const getContentsListStore = create<GetContentsListState>((set) => ({
  ...initialState,
  set: (key, value) => set((state) => ({ ...state, [key]: value })),
  reset: () => set(initialState),
}));

export default getContentsListStore;
