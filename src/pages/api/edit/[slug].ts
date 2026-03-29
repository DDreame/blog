import type { APIRoute } from "astro";

const EDIT_PASSWORD = import.meta.env.EDIT_PASSWORD || "admin";
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN || "";
const GITHUB_REPO_OWNER = "DDreame";
const GITHUB_REPO_NAME = "blog";
const CONTENT_PATH = "content/blog";

function verifyPassword(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );
  return cookies["edit_password"] === EDIT_PASSWORD;
}

async function getFileSha(path: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  return data.sha;
}

async function updateFile(
  path: string,
  content: string,
  message: string
): Promise<boolean> {
  const sha = await getFileSha(path);

  const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${path}`;
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content).toString("base64"),
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}

export const POST: APIRoute = async ({ request }) => {
  if (!GITHUB_TOKEN) {
    return new Response(
      JSON.stringify({ error: "GitHub token not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!verifyPassword(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const { slug, content, frontmatter } = body;

    if (!slug || !content || !frontmatter) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const filePath = `${CONTENT_PATH}/${slug}.md`;
    const dateStr = new Date(frontmatter.date).toISOString().split("T")[0];
    const fileContent = `---
title: ${frontmatter.title}
date: ${dateStr}
draft: ${frontmatter.draft ?? false}
featured: ${frontmatter.featured ?? false}
description: ${frontmatter.description || ""}
---

${content}
`;

    const success = await updateFile(
      filePath,
      fileContent,
      `Update blog post: ${frontmatter.title}`
    );

    if (success) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Failed to update file" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Edit error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const prerender = false;
