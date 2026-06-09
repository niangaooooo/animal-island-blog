import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Modal,
  Phone,
  Title,
  Typewriter,
  type IconName,
} from "animal-island-ui";
import { PostCard } from "../components/PostCard";
import { BlurText } from "../components/react-bits/BlurText";
import { allTags, posts } from "../content/posts";
import { siteConfig } from "../site.config";

const tagIcons: IconName[] = [
  "icon-map",
  "icon-chat",
  "icon-critterpedia",
  "icon-diy",
  "icon-camera",
  "icon-design",
];

export function HomePage() {
  const navigate = useNavigate();
  const latestPosts = posts.slice(0, 3);
  const featureTags = allTags.slice(0, 6);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("animal-island-blog-welcome") !== "seen";
  });

  const closeWelcome = () => {
    localStorage.setItem("animal-island-blog-welcome", "seen");
    setWelcomeOpen(false);
  };

  return (
    <div className="home-page">
      <Modal
        open={welcomeOpen}
        title="欢迎登岛"
        width={560}
        onClose={closeWelcome}
        onOk={() => {
          closeWelcome();
          navigate("/posts");
        }}
        footer={
          <>
            <Button type="default" onClick={closeWelcome}>
              先逛一圈
            </Button>
            <Button
              type="primary"
              onClick={() => {
                closeWelcome();
                navigate("/posts");
              }}
            >
              阅读笔记
            </Button>
          </>
        }
      >
        <p className="welcome-modal-copy">
          这里是 {siteConfig.ownerName} 的小岛日志，先从最新笔记、岛上路牌和关于小屋开始探索吧。
        </p>
      </Modal>

      <section className="hero-section">
        <div className="hero-section__inner">
          <div className="hero-copy">
            <span className="eyebrow">{siteConfig.hero.eyebrow}</span>
            <BlurText as="h1" text={siteConfig.hero.title} className="hero-title" />
            <p className="hero-subtitle">
              <Typewriter speed={24}>{siteConfig.hero.subtitle}</Typewriter>
            </p>
            <div className="hero-actions">
              <Button type="primary" size="large" onClick={() => navigate("/posts")}>
                {siteConfig.hero.primaryAction}
              </Button>
              <Button type="default" size="large" onClick={() => navigate("/about")}>
                {siteConfig.hero.secondaryAction}
              </Button>
            </div>
            <div className="hero-stats" aria-label="站点摘要">
              <Card color="app-yellow" pattern="app-yellow">
                <strong>{posts.length}</strong>
                <span>篇笔记</span>
              </Card>
              <Card color="app-green" pattern="app-green">
                <strong>{allTags.length}</strong>
                <span>个标签</span>
              </Card>
              <Card color="warm-peach-pink" pattern="warm-peach-pink">
                <strong>手账</strong>
                <span>慢慢更新</span>
              </Card>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-phone-stage" aria-label="动森风手机和物品图标">
              <div className="hero-phone-stage__icons" aria-hidden="true">
                {[371, 327, 118, 300, 481, 282].map((item, index) => (
                  <Icon
                    key={item}
                    item={item}
                    size={index % 2 === 0 ? 70 : 58}
                    bounce
                    className="hero-phone-stage__item"
                  />
                ))}
              </div>
              <div className="hero-phone-stage__phone">
                <Phone />
              </div>
              <div className="hero-phone-stage__notice">
                <Icon name="icon-map" size={28} bounce />
                <div>
                  <strong>今日岛报</strong>
                  <span>海风适合写作</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider type="wave-yellow" />

      <section className="page-section page-section--latest">
        <div className="section-heading">
          <Title size="large" color="app-teal">
            最新笔记
          </Title>
          <p>刚被海风吹到码头边的几篇记录。</p>
        </div>
        <div className="posts-grid">
          {latestPosts.map((post) => (
            <PostCard key={post.meta.slug} post={post} />
          ))}
        </div>
        <div className="section-action">
          <Button type="primary" onClick={() => navigate("/posts")}>
            查看全部笔记
          </Button>
        </div>
      </section>

      <Divider type="line-teal" />

      <section className="page-section page-section--tags">
        <div className="section-heading">
          <Title color="app-yellow">岛上路牌</Title>
          <p>用标签从不同方向走进这座小岛。</p>
        </div>
        <div className="tag-board">
          {featureTags.map((tag, index) => (
            <Link key={tag} to={`/posts?tag=${encodeURIComponent(tag)}`} className="tag-board__item">
              <Icon name={tagIcons[index % tagIcons.length]} size={30} bounce />
              <span>{tag}</span>
            </Link>
          ))}
        </div>
      </section>

      <Divider type="line-brown" />

      <section className="page-section page-section--about">
        <div className="about-preview">
          <div className="about-preview__avatar">
            <div className="avatar-icon-stack" aria-hidden="true">
              <Icon item={371} size={132} bounce className="avatar-icon-stack__item" />
              <Icon name="icon-map" size={54} bounce className="avatar-icon-stack__badge" />
            </div>
            <span>{siteConfig.avatarLabel}</span>
          </div>
          <div>
            <Title color="warm-peach-pink">关于岛主</Title>
            <h2>{siteConfig.ownerName}</h2>
            <p>{siteConfig.bio}</p>
            <Button type="default" onClick={() => navigate("/about")}>
              进入小屋
            </Button>
          </div>
        </div>
      </section>

      <Divider type="dashed-yellow" />

      <section className="page-section page-section--subscribe">
        <div className="subscribe-panel">
          <div className="subscribe-panel__copy">
            <Title color="app-green">{siteConfig.subscribe.title}</Title>
            <p>{siteConfig.subscribe.description}</p>
          </div>
          <div className="subscribe-panel__icons" aria-hidden="true">
            <Icon item={300} size={58} bounce />
            <Icon name="icon-chat" size={34} bounce />
          </div>
          <div className="subscribe-form">
            <Input
              value={email}
              size="large"
              allowClear
              placeholder={siteConfig.subscribe.placeholder}
              onChange={(event) => setEmail(event.target.value)}
              onClear={() => setEmail("")}
            />
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (email.trim()) {
                  setSubscribed(true);
                }
              }}
            >
              投递
            </Button>
          </div>
          {subscribed && <p className="subscribe-panel__note">已经把这封来信放进海岸邮筒。</p>}
        </div>
      </section>
    </div>
  );
}
