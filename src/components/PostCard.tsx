import { Link } from "react-router-dom";
import { Card, Icon } from "animal-island-ui";
import type { PostEntry } from "../content/posts";
import { formatPostDate } from "../content/posts";

interface PostCardProps {
  post: PostEntry;
}

const coverItems: Record<PostEntry["meta"]["cover"], number> = {
  shore: 371,
  code: 327,
  garden: 118,
  letter: 300,
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.meta.slug}`} className="post-card-link">
      <Card color={post.meta.mood} pattern={post.meta.mood} className="post-card">
        <div className="post-card__cover" aria-hidden="true">
          <Icon item={coverItems[post.meta.cover]} size={112} bounce className="post-card__cover-item" />
          <Icon name="icon-map" size={34} bounce className="post-card__cover-badge" />
        </div>
        <div className="post-card__body">
          <div className="post-card__meta">
            <span>{formatPostDate(post.meta.date)}</span>
            <span>{post.meta.readingTime}</span>
          </div>
          <h3>{post.meta.title}</h3>
          <p>{post.meta.excerpt}</p>
          <div className="post-card__tags">
            {post.meta.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
