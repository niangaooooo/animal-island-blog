import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Divider, Icon, Input, Loading, Tabs, Title } from "animal-island-ui";
import { PostCard } from "../components/PostCard";
import { allTags, posts, type PostEntry } from "../content/posts";

function PostGrid({ items }: { items: PostEntry[] }) {
  if (items.length === 0) {
    return (
      <Card type="dashed" className="empty-card">
        <Loading />
        <p>这条小路暂时没有文章。</p>
      </Card>
    );
  }

  return (
    <div className="posts-grid">
      {items.map((post) => (
        <PostCard key={post.meta.slug} post={post} />
      ))}
    </div>
  );
}

export function PostsPage() {
  const [searchParams] = useSearchParams();
  const initialTag = searchParams.get("tag") ?? "all";
  const [activeTag, setActiveTag] = useState(allTags.includes(initialTag) ? initialTag : "all");
  const [query, setQuery] = useState("");

  const tabItems = useMemo(() => {
    const filterPosts = (tag: string) => {
      const normalizedQuery = query.trim().toLowerCase();

      return posts.filter((post) => {
        const tagMatched = tag === "all" || post.meta.tags.includes(tag);
        const queryMatched =
          normalizedQuery.length === 0 ||
          [post.meta.title, post.meta.excerpt, post.meta.tags.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return tagMatched && queryMatched;
      });
    };

    return ["all", ...allTags].map((tag) => ({
      key: tag,
      label: tag === "all" ? "全部" : tag,
      children: <PostGrid items={filterPosts(tag)} />,
    }));
  }, [query]);

  return (
    <div className="page-wrap posts-page">
      <section className="page-hero page-hero--compact">
        <div className="page-hero__icons" aria-hidden="true">
          <Icon name="icon-critterpedia" size={44} bounce />
          <Icon name="icon-chat" size={38} bounce />
          <Icon name="icon-map" size={44} bounce />
        </div>
        <span className="eyebrow">notes archive</span>
        <h1>笔记码头</h1>
        <p>按标签和关键词整理所有文章，适合慢慢翻，也适合快速找回某个想法。</p>
      </section>

      <Divider type="wave-yellow" />

      <section className="page-section">
        <div className="posts-toolbar">
          <Title color="app-teal">全部文章</Title>
          <Input
            value={query}
            allowClear
            shadow
            placeholder="搜索标题、摘要或标签"
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
          />
        </div>
        <Tabs items={tabItems} activeKey={activeTag} onChange={setActiveTag} />
      </section>
    </div>
  );
}
