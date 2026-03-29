import type { APIRoute } from "astro";

const EDIT_PASSWORD = import.meta.env.EDIT_PASSWORD || "admin";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== EDIT_PASSWORD) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `edit_password=${EDIT_PASSWORD}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const prerender = false;
