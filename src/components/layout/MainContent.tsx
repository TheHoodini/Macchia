import { useState, ChangeEvent, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import IconText from "../../assets/text.svg";
import IconCode from "../../assets/code.svg";

export function MainContent() {
  const [markdown, setMarkdown] = useState<string>("");
  const [mode, setMode] = useState<"editor" | "render">("editor");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; 
      textarea.style.height = `${textarea.scrollHeight}px`; 
    }
  };

  useEffect(() => {
    if (mode === "editor") autoResize();
  }, [markdown, mode]);

  // Handle change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // Handle file upload (.md, .txt)
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith(".md") && !fileName.endsWith(".txt")) {
        alert("Please, load a file with a .md or .txt extension");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setMarkdown(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="px-6 mb-12 flex flex-col items-center">
      {/* Load file */}
      <div className="w-full max-w-3xl mb-4 mt-7">
        <input type="file" accept=".md,.txt" onChange={handleFileUpload} />
      </div>

      {/* Main container */}
      <div
        className="relative w-full max-w-3xl border-[3px] border-black rounded shadow-[3px_3px] bg-white overflow-auto"
        style={{ maxHeight: "70vh" }} // Max scroll height 
      >
        {/* Buttons */}
        <div className="sticky top-3 right-2 flex justify-end pr-3 z-10">
          <button
            onClick={() => setMode("editor")}
            className={`px-2 mr-2 py-1 rounded border-black border-[3px] shadow-[1px_1px] ${
              mode === "editor"
                ? "bg-gray-200"
                : "bg-white"
            }`}
            title="Editor"
          >
            <img src={IconCode} alt="Text" style={{ width: '20px', height: '20px' }}/>
          </button>
          <button
            onClick={() => setMode("render")}
            className={`px-2 py-1 rounded border-black border-[3px] shadow-[1px_1px] ${
              mode === "render"
                ? "bg-gray-200"
                : "bg-white"
            }`}
            title="Render"
          >
            <img src={IconText} alt="Text" style={{ width: '20px', height: '20px' }}/>
          </button>
        </div>

        {/* Markdown textarea */}
        <div className="pl-4">
          {mode === "editor" ? (
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={handleChange}
              placeholder="Start writing!"
              className="w-full outline-none resize-none overflow-hidden"
              // min height
              style={{ minHeight: "295px" }}
            />
          ) : (
            // Render textarea
            <div
              className="prose w-full"
              // min height
              style={{ minHeight: "300px" }}
            >
              {markdown ? (
                <ReactMarkdown>{markdown}</ReactMarkdown>
              ) : (
                <p className="italic text-gray-400">Looks empty here too...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
