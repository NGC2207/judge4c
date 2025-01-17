"use client";

import { useCallback } from "react";
import { highlighter } from "@/lib/shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { Skeleton } from "@/components/ui/skeleton";
import Editor, { Monaco } from "@monaco-editor/react";
import { useProblemDescriptionEditor } from "@/hooks/useProblemDescriptionEditor";

const skeleton = <Skeleton className="h-full w-full rounded-xl" />;

export default function ProblemDescriptionEditor() {
  const { theme, problemDescription, language, handleChange } =
    useProblemDescriptionEditor();

  const handleBeforeMount = useCallback((monaco: Monaco) => {
    try {
      shikiToMonaco(highlighter, monaco);
    } catch (error) {
      console.error("Failed to initialize Monaco with Shiki:", error);
    }
  }, []);

  return (
    <Editor
      theme={theme}
      loading={skeleton}
      language={language}
      value={problemDescription}
      beforeMount={handleBeforeMount}
      onChange={handleChange}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: "on",
      }}
    />
  );
}
