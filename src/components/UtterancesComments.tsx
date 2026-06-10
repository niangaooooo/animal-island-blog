import { useEffect, useRef } from "react";

const repository = "niangaooooo/animal-island-blog";

export function UtterancesComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const getTheme = () =>
      document.documentElement.dataset.theme === "dark" ? "github-dark" : "github-light";

    container.replaceChildren();

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", repository);
    script.setAttribute("issue-number", "1");
    script.setAttribute("theme", getTheme());
    container.appendChild(script);

    const observer = new MutationObserver(() => {
      const frame = container.querySelector<HTMLIFrameElement>("iframe.utterances-frame");
      frame?.contentWindow?.postMessage(
        { type: "set-theme", theme: getTheme() },
        "https://utteranc.es",
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="utterances-host" />;
}
