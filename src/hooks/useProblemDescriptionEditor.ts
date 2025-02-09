import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";
import { useProblemDescriptionEditorStore } from "@/store/useProblemDescriptionEditorStore";

export function useProblemDescriptionEditor() {
  const { resolvedTheme } = useTheme();
  const isDirtyRef = useRef(false);

  const { language, problemDescription, setProblemDescription } =
    useProblemDescriptionEditorStore();

  const theme = resolvedTheme === "light" ? "github-light-default" : "github-dark-default";

  const handleChange = useCallback(
    (value: string | undefined) => {
      isDirtyRef.current = true;
      setProblemDescription(value || "");
    },
    [setProblemDescription]
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return {
    theme,
    problemDescription,
    language,
    handleChange,
  };
}
