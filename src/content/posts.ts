import type { ComponentType } from "react";

export type BlogColor =
  | "default"
  | "app-pink"
  | "purple"
  | "app-blue"
  | "app-yellow"
  | "app-orange"
  | "app-teal"
  | "app-green"
  | "app-red"
  | "lime-green"
  | "yellow-green"
  | "brown"
  | "warm-peach-pink";

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  mood: BlogColor;
  cover: "shore" | "code" | "garden" | "letter";
  readingTime: string;
}

export interface PostModule {
  meta: PostMeta;
  default: ComponentType;
}

export interface PostEntry {
  meta: PostMeta;
  Component: ComponentType;
}

const modules = import.meta.glob<PostModule>("./posts/*.mdx", { eager: true });

export const posts: PostEntry[] = Object.values(modules)
  .map((module) => ({
    meta: module.meta,
    Component: module.default,
  }))
  .sort((left, right) => new Date(right.meta.date).getTime() - new Date(left.meta.date).getTime());

export const allTags = Array.from(new Set(posts.flatMap((post) => post.meta.tags))).sort((a, b) =>
  a.localeCompare(b, "zh-CN"),
);

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.meta.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const currentIndex = posts.findIndex((post) => post.meta.slug === slug);

  if (currentIndex < 0) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: posts[currentIndex + 1],
    next: posts[currentIndex - 1],
  };
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
