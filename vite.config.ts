import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "animal-island-blog";
  const buildBase = process.env.VITE_BASE_PATH ?? `/${repositoryName}/`;

  return {
    base: command === "serve" ? "/" : buildBase,
    plugins: [
      mdx({
        providerImportSource: "@mdx-js/react",
      }),
      react(),
    ],
  };
});
