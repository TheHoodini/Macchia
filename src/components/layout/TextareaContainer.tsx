import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import sanitizeHtml from "sanitize-html";

interface TextareaContainerProps {
  markdown: string;
  setMarkdown: (value: string) => void;
  mode: "editor" | "render";
}

export function TextareaContainer({ markdown, setMarkdown, mode }: TextareaContainerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Save the scroll position before switching modes
  useEffect(() => {
    scrollPositionRef.current = window.scrollY;
  }, [mode]);

  // Restore the scroll position after switching modes
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPositionRef.current, behavior: "instant" });
    });
  }, [mode]);

  // Auto-resize the textarea so it expands instead of scrolling
  useEffect(() => {
    if (mode === "editor") {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [markdown, mode]);

  // Sanitize user input
  const cleanMarkdown = sanitizeHtml(markdown, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      a: ["href", "target", "rel"],
    },
    allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"],
  });

  return (
    <div className="p-4 w-full">
      {mode === "editor" ? (
        // Editor mode
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Start writing!"
          className="w-full outline-none resize-none overflow-hidden"
          style={{ minHeight: "295px" }}
        />
      ) : (
        // Rendered Markdown mode
        <div
          className="prose w-full max-w-none break-words whitespace-pre-wrap overflow-hidden
          [&_*]:my-2 [&_ul]:m-0 [&_ol]:mb-1"
          style={{ minHeight: "300px" }}
        >
          {cleanMarkdown ? (
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{cleanMarkdown}</ReactMarkdown>
          ) : (
            <p className="italic text-gray-400">Looks empty here too...</p>
          )}
        </div>
      )}
    </div>
  );
}
