import type { APIRoute } from "astro";
import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";
import { globby } from "globby";

const contentDirectory = path.normalize("./content");

export const GET: APIRoute = async () => {
  try {
    const pathToDir = path.posix.join(contentDirectory, "blog");
    const paths = await globby(`${pathToDir}/*.md`);

    const posts = await Promise.all(
      paths.map(async (filepath) => {
        const rawString = await fs.readFile(filepath, "utf8");
        const { content, data: frontmatter } = matter(rawString);

        const filename = filepath.split("/").pop();
        const slug = filename.replace(/\.[^.]*$/, "");

        return {
          slug,
          title: frontmatter.title || "Untitled",
          date: frontmatter.date
            ? new Date(frontmatter.date).toISOString().split("T")[0]
            : "",
          draft: frontmatter.draft || false,
          featured: frontmatter.featured || false,
          description: frontmatter.description || "",
          content: content.trim(),
        };
      })
    );

    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const prerender = false;
