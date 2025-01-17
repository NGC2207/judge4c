"use client";

import remarkGfm from "remark-gfm";
import { Skeleton } from "@/components/ui/skeleton";
import { serialize } from "next-mdx-remote/serialize";
import { useCallback, useEffect, useState } from "react";
import { CircleAlert, TriangleAlert } from "lucide-react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MdxPreviewProps {
  mdx: string;
}

export default function MdxPreview({ mdx }: MdxPreviewProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const serializeMdx = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const serialized = await serialize(mdx, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });
      setMdxSource(serialized);
    } catch (error) {
      console.error("Failed to serialize Mdx:", error);
      setError("Failed to load mdx content.");
    } finally {
      setIsLoading(false);
    }
  }, [mdx]);

  useEffect(() => {
    serializeMdx();
  }, [serializeMdx]);

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="rounded-lg border border-red-500/50 px-4 py-3 text-red-600">
          <p className="text-sm">
            <CircleAlert
              className="-mt-0.5 me-3 inline-flex opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!mdx) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="rounded-lg border border-amber-500/50 px-4 py-3 text-amber-600">
          <p className="text-sm">
            <TriangleAlert
              className="-mt-0.5 me-3 inline-flex opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            No content to preview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full markdown-body">
      <MDXRemote {...mdxSource!} />
    </div>
  );
}