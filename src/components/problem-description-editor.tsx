"use client";

import { useTheme } from "next-themes";
import { highlighter } from "@/lib/shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { Skeleton } from "@/components/ui/skeleton";
import Editor, { Monaco } from "@monaco-editor/react";

export default function ProblemDescriptionEditor() {
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === "light" ? "github-light" : "github-dark";

  const handleBeforeMount = (monaco: Monaco) => {
    shikiToMonaco(highlighter, monaco);
  };

  const skeleton = <Skeleton className="h-full w-full rounded-xl" />;

  return (
    <Editor
      theme={theme}
      language="markdown"
      loading={skeleton}
      beforeMount={handleBeforeMount}
      options={{ automaticLayout: true, minimap: { enabled: false } }}
    />
  );
}
