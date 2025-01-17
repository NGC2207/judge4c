import { create } from "zustand";

interface ProblemDescriptionEditorState {
  language: string;
  problemDescription: string;
  setProblemDescription: (problemDescription: string) => void;
}

export const useProblemDescriptionEditorStore =
  create<ProblemDescriptionEditorState>((set) => ({
    language: "markdown",
    problemDescription: "",
    setProblemDescription: (problemDescription) => set({ problemDescription }),
  }));