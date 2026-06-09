import { type ComponentProps } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Divider, Icon, Title } from "animal-island-ui";
import { formatPostDate, getAdjacentPosts, getPostBySlug } from "../content/posts";

const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => <h1 className="mdx-title" {...props} />,
  h2: (props: ComponentProps<"h2">) => <h2 className="mdx-heading" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mdx-paragraph" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => <blockquote className="mdx-quote" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mdx-list" {...props} />,
  a: (props: ComponentProps<"a">) => <a className="mdx-link" {...props} />,
};

const coverItems = {
  shore: 371,
  code: 327,
  garden: 118,
  letter: 300,
} as const;

export function PostPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="page-wrap">
        <section className="page-section not-found">
          <Title color="app-red">没有找到这篇文章</Title>
          <p>也许它被海风吹到了别的地方。</p>
          <Button type="primary" onClick={() => navigate("/posts")}>
            返回笔记码头
          </Button>
        </section>
      </div>
    );
  }

  const { previous, next } = getAdjacentPosts(post.meta.slug);
  const PostContent = post.Component;

  return (
    <div className="page-wrap post-page">
      <section className="post-hero">
        <div className="post-hero__copy">
          <Link to="/posts" className="back-link">
            <Icon name="icon-map" size={16} bounce />
            返回笔记码头
          </Link>
          <div className="post-hero__tags">
            {post.meta.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h1>{post.meta.title}</h1>
          <p>{post.meta.excerpt}</p>
          <div className="post-hero__meta">
            <span>{formatPostDate(post.meta.date)}</span>
            <span>{post.meta.readingTime}</span>
          </div>
        </div>
        <Card color={post.meta.mood} pattern={post.meta.mood} className="post-hero__cover">
          <Icon item={coverItems[post.meta.cover]} size={170} bounce className="post-hero__cover-item" />
          <Icon name="icon-map" size={54} bounce className="post-hero__cover-badge" />
        </Card>
      </section>

      <Divider type="line-teal" />

      <article className="post-article">
        <MDXProvider components={mdxComponents}>
          <PostContent />
        </MDXProvider>
      </article>

      <nav className="post-neighbors" aria-label="相邻文章">
        {previous ? (
          <Link to={`/posts/${previous.meta.slug}`}>
            <Card color={previous.meta.mood} pattern={previous.meta.mood}>
              <span>上一篇</span>
              <strong>{previous.meta.title}</strong>
            </Card>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/posts/${next.meta.slug}`}>
            <Card color={next.meta.mood} pattern={next.meta.mood}>
              <span>下一篇</span>
              <strong>{next.meta.title}</strong>
            </Card>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
