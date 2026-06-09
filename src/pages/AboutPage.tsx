import { Button, Card, Divider, Icon, Phone, Title, type IconName } from "animal-island-ui";
import { posts } from "../content/posts";
import { siteConfig } from "../site.config";

const values = [
  { title: "慢一点", body: "把想法写清楚，再让它们出门。", color: "app-teal", icon: "icon-chat" },
  { title: "有手感", body: "界面要有轻微的纹理、反馈和呼吸感。", color: "app-yellow", icon: "icon-diy" },
  { title: "可替换", body: "内容和配置分开，未来换资料不用重写页面。", color: "warm-peach-pink", icon: "icon-map" },
] as const;

export function AboutPage() {
  return (
    <div className="page-wrap about-page">
      <section className="page-hero about-hero">
        <div className="about-hero__avatar">
          <div className="avatar-icon-stack" aria-hidden="true">
            <Icon item={371} size={152} bounce className="avatar-icon-stack__item" />
            <Icon name="icon-design" size={58} bounce className="avatar-icon-stack__badge" />
          </div>
          <span>{siteConfig.avatarLabel}</span>
        </div>
        <div>
          <span className="eyebrow">island profile</span>
          <h1>{siteConfig.ownerName}</h1>
          <p>{siteConfig.bio}</p>
          <div className="about-links">
            {siteConfig.links.map((link) => (
              <Button
                key={link.label}
                type={link.label === "邮箱" ? "primary" : "default"}
                onClick={() => {
                  window.location.href = link.url;
                }}
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Divider type="wave-yellow" />

      <section className="page-section">
        <div className="section-heading">
          <Title color="app-green">这座岛的气质</Title>
          <p>首版内容是占位，但结构已经可以承接真实的个人博客。</p>
        </div>
        <div className="values-grid">
          {values.map((value) => (
            <Card key={value.title} color={value.color} pattern={value.color}>
              <Icon name={value.icon as IconName} size={34} bounce />
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <Divider type="line-brown" />

      <section className="page-section about-map">
        <Title color="app-yellow">小岛地图</Title>
        <div className="map-grid">
          <Card color="app-blue" pattern="app-blue">
            <strong>{posts.length}</strong>
            <span>篇可编辑 MDX 文章</span>
          </Card>
          <Card color="app-green" pattern="app-green">
            <strong>{siteConfig.navItems.length}</strong>
            <span>个主要入口</span>
          </Card>
          <Card color="warm-peach-pink" pattern="warm-peach-pink">
            <strong>Pages</strong>
            <span>海岸灯塔上线</span>
          </Card>
        </div>
        <div className="about-phone-row" aria-hidden="true">
          <Phone />
        </div>
      </section>
    </div>
  );
}
