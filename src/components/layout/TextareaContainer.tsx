import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface TextareaContainerProps {
    markdown: string;
    setMarkdown: (value: string) => void;
    mode: "editor" | "render";
}

export function TextareaContainer({ markdown, setMarkdown, mode }: TextareaContainerProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    return (
        <div className="px-4 w-full">
            {mode === "editor" ? (
                <textarea
                    ref={textareaRef}
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Start writing!"
                    className="w-full outline-none resize-none overflow-hidden"
                    style={{ minHeight: "295px" }} 
                />
            ) : (
                <div
                    className="prose w-full max-w-none break-words whitespace-pre-wrap"
                    style={{ minHeight: "300px" }} 
                >
                    {markdown ? (
                        <ReactMarkdown>{markdown.replace(/\n\n/g, "\n")}</ReactMarkdown>
                    ) : (
                        <p className="italic text-gray-400">Looks empty here too...</p>
                    )}
                </div>
            )}
        </div>
    );
}
