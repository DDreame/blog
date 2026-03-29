import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";
import { globby } from "globby";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDirectory = path.normalize(path.join(__dirname, "../../content"));

async function generatePostsJson() {
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

  const outputPath = path.join(__dirname, "../../public/posts.json");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(posts, null, 2));

  console.log(`Generated ${posts.length} posts to dist/posts.json`);
}

generatePostsJson().catch(console.error);
