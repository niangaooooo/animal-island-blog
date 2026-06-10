import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Cursor } from "animal-island-ui";
import { AppShell } from "./components/layout/AppShell";
import { AboutPage } from "./pages/AboutPage";
import { GuestbookPage } from "./pages/GuestbookPage";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";
import { PostsPage } from "./pages/PostsPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <Cursor>
        <ScrollToTop />
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="posts/:slug" element={<PostPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="guestbook" element={<GuestbookPage />} />
          </Route>
        </Routes>
      </Cursor>
    </HashRouter>
  );
}
