# 动森风个人博客

一个独立的 Vite + React + TypeScript + MDX 个人博客。UI 使用 `animal-island-ui`，沉浸动画组件放在 `src/components/react-bits` 内，方便继续改造。

## 开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
pnpm preview
```

## 个性化

- 站点资料：`src/site.config.ts`
- 文章：`src/content/posts/*.mdx`
- 首页/列表/文章页：`src/pages`

GitHub Pages 默认构建 base 为 `/animal-island-blog/`。如果仓库名不同，修改 `vite.config.ts` 里的构建 base。
