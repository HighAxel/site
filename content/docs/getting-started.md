---
title: Getting Started
description: Set up the bot quickly
---

# Getting Started

Invite the bot:

```bash
https://discord.com/oauth2/authorize?client_id=YOUR_ID
Steps
Invite the bot
Run /setup
Configure modules

---

# 🧠 Step 4: Docs loader

### `lib/docs.ts`

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsPath = path.join(process.cwd(), "content/docs");

export function getDocs() {
  const files = fs.readdirSync(docsPath);

  return files.map((file) => {
    const slug = file.replace(".md", "");
    const fullPath = path.join(docsPath, file);
    const content = fs.readFileSync(fullPath, "utf-8");

    const { data } = matter(content);

    return {
      slug,
      title: data.title,
      description: data.description,
    };
  });
}

export function getDocBySlug(slug: string) {
  const fullPath = path.join(docsPath, `${slug}.md`);
  const content = fs.readFileSync(fullPath, "utf-8");

  return matter(content);
}