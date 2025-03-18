import { useEffect, useRef, RefObject } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import sanitizeHtml from "sanitize-html";

interface TextareaContainerProps {
  markdown: string;
  setMarkdown: (value: string) => void;
  mode: "editor" | "render";
  textareaRef: RefObject<HTMLTextAreaElement | null>; 
  applyFormatting: (format: "bold" | "italic" | "underline") => void;
}

export function TextareaContainer({ markdown, setMarkdown, mode, textareaRef, applyFormatting }: TextareaContainerProps) {
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    scrollPositionRef.current = window.scrollY;
  }, [mode]);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPositionRef.current, behavior: "instant" });
    });
  }, [mode]);

  useEffect(() => {
    if (mode === "editor") {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [markdown, mode]);

  const cleanMarkdown = sanitizeHtml(markdown, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["u"]),
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
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Start writing!"
          className="w-full outline-none resize-none overflow-hidden"
          style={{ minHeight: "285px" }}
          onKeyDown={(e) => {
            if (e.ctrlKey) {
              if (e.key === "b") {
                e.preventDefault();
                applyFormatting("bold");
              } else if (e.key === "i") {
                e.preventDefault();
                applyFormatting("italic");
              } else if (e.key === "u") {
                e.preventDefault();
                applyFormatting("underline");
              }
            }
          }}
        />
      ) : (
        <div
          className="prose w-full max-w-none break-words whitespace-pre-wrap overflow-hidden
          [&_*]:my-2 [&_ul]:m-0 [&_ol]:mb-1"
          style={{ minHeight: "290px" }}
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
