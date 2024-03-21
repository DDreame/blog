<div align="center">

<!-- <img src="public/project.png" alt="Screenshot" /> -->

<hr/>

<h3 align="center">
 一个基于[OpenBlog]构造的个人博客
</h3>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdanielcgilibert%2Fblog-template)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/danielcgilibert/blog-template)

</div>

## 📌 Table Of Contents

- [📌 Table Of Contents](#-table-of-contents)
- [🛣️ Roadmap](#️-roadmap)
- [⚙️ Stack](#️-stack)
- [📄 Adding a post](#-adding-a-post)
- [📝 Activating draft mode](#-activating-draft-mode)
- [🧞 Commands](#-commands)

## 🛣️ Roadmap

- ❌ Add post author
- ❌ Add customization with colors
- ❌ Add filters for reading time, date...
- ❌ More sharing options
- ❌ Internationalization (i18n)

## ⚙️ Stack

- [**ASTRO** + **Typescript**](https://astro.build/) - Astro is the all-in-one web framework designed for speed.
- [**Tailwind CSS** + **Tailwind-Merge** + **clsx**](https://tailwindcss.com/) - Tailwind CSS is a utility-first CSS framework.
- [**Tabler Icons**](https://tabler-icons.io/i/) - A open source SVG icons.
- [**Eslint**](https://eslint.org/) - ESLint is an open source project that helps you find and fix problems.
- [**Prettier**](https://prettier.io/) - Code formatter.
- [**Search Library**](https://pagefind.app/) - Static search library integration.
- [**Motion**](https://motion.dev/) - Motion One is the smallest fully-featured animation library for the web.
- [**Tina CMS**](https://tina.io/) - CMS.

## 📄 Adding a post

Adding a post is as simple as adding a .md or .mdx file to the blog folder at the path **src/content/blog**. The filename will be used to create the slug/URL of the page.

For example, if you have a file named **jsx-and-react.md**, it will be transformed into: **http://yourdomain.com/post/jsx-and-react/**

## 📝 Activating draft mode

To activate draft mode, add the property **draft: true** to the file, and it will no longer be displayed on the blog.

Example :

```ts
title: MacBook Pro 2022
description: 'The new MacBook Pro 2022 is here. With the Apple M2 chip, a new design, and more, the new MacBook Pro is the best laptop Apple has ever made.'
pubDate: 'Jul 02 2022'
heroImage: '../../assets/bg.jpg'
category: 'Category 1'
tags: ['JavaScript', 'css', 'HTML5', 'GitHub']
draft: true <---
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                                                                                                           |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`          | Installs dependencies                                                                                                            |
| `pnpm run dev`          | Starts local dev server at `localhost:3000`                                                                                      |
| `pnpm run build`        | Build your production site to `./dist/`                                                                                          |
| `pnpm run preview`      | Preview your build locally, before deploying                                                                                     |
| `pnpm run format:check` | Check code format with Prettier                                                                                                  |
| `pnpm run format`       | Format codes with Prettier                                                                                                       |
| `pnpm run sync`         | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `pnpm run lint`         | Lint with ESLint                                                                                                                 |
