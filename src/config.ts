// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "莫向外求";
export const SITE_DESCRIPTION =
  "梦某人努力学习, 挣扎自救的博客记录";
export const TWITTER_HANDLE = "@_DDreame";
export const MY_NAME = "梦某人";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
