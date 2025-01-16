"use client";

import { useTheme } from "next-themes";
import { highlighter } from "@/lib/shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { Skeleton } from "@/components/ui/skeleton";
import Editor, { Monaco } from "@monaco-editor/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ProblemDescriptionEditor() {
  const { resolvedTheme } = useTheme();
  const [isDirty, setIsDirty] = useState(false);

  const theme = resolvedTheme === "light" ? "github-light" : "github-dark";

  const handleBeforeMount = useCallback((monaco: Monaco) => {
    shikiToMonaco(highlighter, monaco);
  }, []);

  const handleChange = useCallback(() => {
    setIsDirty(true);
  }, []);

  const skeleton = useMemo(
    () => <Skeleton className="h-full w-full rounded-xl" />,
    []
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <Editor
      theme={theme}
      language="markdown"
      loading={skeleton}
      beforeMount={handleBeforeMount}
      onChange={handleChange}
      options={{ automaticLayout: true, minimap: { enabled: false } }}
    />
  );
}
