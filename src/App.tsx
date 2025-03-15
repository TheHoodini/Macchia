import { useState, ChangeEvent, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export function App() {
  const [markdown, setMarkdown] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust textarea height
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; 
      textarea.style.height = textarea.scrollHeight + "px"; 
    }
  };

  useEffect(() => {
    autoResize();
  }, [markdown]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // Read files (.md .txt)
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Macchia</h1>

      {/* Botón de carga */}
      <div className="mb-4">
        <input type="file" accept=".md,.txt" onChange={handleFileUpload} />
      </div>

      {/* Textarea editable */}
      <textarea
        ref={textareaRef}
        value={markdown}
        onChange={handleChange}
        placeholder="Start writing!"
        className="w-full p-4 border-2 border-black rounded mb-4 shadow-[5px_5px] outline-none resize-none overflow-hidden"
      />

      <p>Renderizado</p>

      {/* Renderizado Markdown */}
      <div className="prose max-w-none border-2 border-black rounded shadow-[5px_5px] p-4 w-full">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
