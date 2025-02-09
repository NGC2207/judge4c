import { createHighlighter } from "shiki";

export const highlighter = await createHighlighter({
  themes: ["github-light-default", "github-dark-default"],
  langs: ["mdx"],
});
