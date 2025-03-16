// src/components/Content.tsx
import { useState, ChangeEvent, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export function MainContent() {
    const [markdown, setMarkdown] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto resize for textarea
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

    // Handle textarea change
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

            {/* Editable Textarea */}
            <textarea
                ref={textareaRef}
                value={markdown}
                onChange={handleChange}
                placeholder="Start writing!"
                className="w-full  max-w-3xl p-4 border-[3px] border-black rounded mb-8 shadow-[3px_3px] outline-none resize-none overflow-hidden"
            />

            <p className="w-full max-w-3xl font-bold text-xl mb-2">
                Rendered
            </p>

            {/* Render Markdown */}
            <div className="prose max-w-3xl border-[3px] border-black rounded shadow-[3px_3px] p-4 w-full bg-white">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
}
