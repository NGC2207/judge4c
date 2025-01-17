import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface ProblemCreateLayoutProps {
  children: React.ReactNode;
  mdxPreview: React.ReactNode;
}

export default function ProblemCreateLayout({
  children,
  mdxPreview,
}: ProblemCreateLayoutProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={50}>{children}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>{mdxPreview}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
