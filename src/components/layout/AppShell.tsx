import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button, Footer, Icon, Switch, type IconName } from "animal-island-ui";
import { siteConfig } from "../../site.config";

const navIcons: Record<string, IconName> = {
  "/": "icon-map",
  "/posts": "icon-chat",
  "/about": "icon-design",
};

export function AppShell() {
  const [dark, setDark] = useState(() => localStorage.getItem("island-theme") === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("island-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="site-brand" aria-label={`${siteConfig.siteName}首页`}>
            <span className="site-brand__mark" aria-hidden="true">
              <Icon item={371} size={34} bounce />
            </span>
            <span className="site-brand__text">
              <strong>{siteConfig.siteName}</strong>
              <small>{siteConfig.location}</small>
            </span>
          </Link>

          <nav className="site-nav" aria-label="主导航">
            {siteConfig.navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `site-nav__link ${isActive ? "is-active" : ""}`}
              >
                <Icon name={navIcons[item.to] ?? "icon-map"} size={18} bounce />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <Switch
              checked={dark}
              onChange={setDark}
              checkedChildren="夜"
              unCheckedChildren="昼"
            />
            <Button
              type="primary"
              size="small"
              onClick={() => {
                window.location.href = siteConfig.links.find((link) => link.label === "邮箱")?.url ?? "/";
              }}
            >
              <Icon name="icon-chat" size={16} bounce />
              写信
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <strong>{siteConfig.siteName}</strong>
            <p>{siteConfig.tagline}</p>
          </div>
          <div className="site-footer__links">
            {siteConfig.links.map((link) => (
              <a key={link.label} href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <Footer type="sea" />
      </footer>
    </div>
  );
}
