"use client";

import MdxPreview from "@/components/mdx-preview";
import { useProblemDescriptionEditorStore } from "@/store/useProblemDescriptionEditorStore";

export default function MdxPreviewPage() {
  const { problemDescription } = useProblemDescriptionEditorStore();

  return <MdxPreview mdx={problemDescription} />;
}
