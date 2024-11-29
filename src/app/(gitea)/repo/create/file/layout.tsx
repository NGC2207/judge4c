import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppSidebar } from "@/app/(gitea)/repo/create/file/components/app-sidebar";

interface RepoCreateFileLayoutProps {
  children: React.ReactNode;
}

export default function RepoCreateFileLayout({
  children,
}: RepoCreateFileLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-8">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <ThemeToggle />
        </header>
        <div className="h-full w-full relative">
          <div className="h-full overflow-hidden">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
