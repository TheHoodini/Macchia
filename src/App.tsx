import { useState, useRef, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Navbar } from "./components/layout/Navbar";
import { MainContent } from "./components/layout/MainContent";

export function App() {
  const [mode, setMode] = useState<"editor" | "render">("editor");
  const [markdown, setMarkdown] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormatting = (format: "bold" | "italic" | "underline") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);

    if (!selectedText) return;

    let formattedText = selectedText;

    if (format === "bold") {
      formattedText = `**${selectedText}**`;
    } else if (format === "italic") {
      formattedText = `*${selectedText}*`;
    } else if (format === "underline") {
      formattedText = `<u>${selectedText}</u>`;
    }

    const newMarkdown = markdown.substring(0, start) + formattedText + markdown.substring(end);
    setMarkdown(newMarkdown);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + formattedText.length;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Navbar mode={mode} setMode={setMode} applyFormatting={applyFormatting} />
      <main className="bg-[#38dbff] flex-1 overflow-y-auto">
        <MainContent
          mode={mode}
          markdown={markdown}
          setMarkdown={setMarkdown}
          textareaRef={textareaRef}
          applyFormatting={applyFormatting} />
      </main>
    </div>
  );
}
