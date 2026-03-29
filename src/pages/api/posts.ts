import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(`${import.meta.env.SITE}/posts.json`);
    const posts = await response.json();

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
