export interface SiteLink {
  label: string;
  url: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export interface SiteConfig {
  siteName: string;
  ownerName: string;
  tagline: string;
  bio: string;
  avatarLabel: string;
  location: string;
  links: SiteLink[];
  navItems: NavItem[];
  hero: {
    title: string;
    eyebrow: string;
    subtitle: string;
    primaryAction: string;
    secondaryAction: string;
  };
  subscribe: {
    title: string;
    description: string;
    placeholder: string;
  };
}

export const siteConfig: SiteConfig = {
  siteName: "狸风小岛日志",
  ownerName: "Nian",
  tagline: "在一座慢慢生长的小岛上，记录代码、生活与灵感。",
  bio: "这里暂时放一段可替换的个人简介：喜欢把复杂的事情整理成温柔可读的文字，也喜欢做带一点手感的软件。这个博客会收集项目笔记、生活观察、设计灵感和一些小实验。",
  avatarLabel: "N",
  location: "南方海岸 · 代码小屋",
  links: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "邮箱", url: "mailto:niangaooooo@icloud.com" },
    { label: "RSS", url: "#/posts" }
  ],
  navItems: [
    { label: "首页", to: "/" },
    { label: "笔记", to: "/posts" },
    { label: "关于", to: "/about" }
  ],
  hero: {
    eyebrow: "personal island journal",
    title: "欢迎来到一座会写笔记的小岛",
    subtitle:
      "把技术记录、生活观察和灵感碎片收进海风里。每天走过码头、邮箱和小屋，留下几页可以慢慢翻的岛上手账。",
    primaryAction: "阅读最新笔记",
    secondaryAction: "认识岛主"
  },
  subscribe: {
    title: "海风来信",
    description: "把你的邮箱放进海岸邮筒，等下一封关于代码、生活和灵感的小岛来信。",
    placeholder: "your@email.com"
  }
};
