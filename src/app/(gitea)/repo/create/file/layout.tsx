interface RepoCreateFileLayoutProps {
  children: React.ReactNode;
}

export default function RepoCreateFileLayout({
  children,
}: RepoCreateFileLayoutProps) {
  return (
    <div className="relative">
      <div className="container py-6 mx-auto">
        <div className="overflow-hidden rounded-lg border bg-background shadow">
          {children}
        </div>
      </div>
    </div>
  );
}
