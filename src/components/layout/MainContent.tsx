// src/components/MainContent.tsx
import { useState, ChangeEvent } from "react";
import { LoadFileButton } from "./LoadFileButton";
import { ButtonsContainer } from "./ButtonsContainer";
import { TextareaContainer } from "./TextareaContainer";

export function MainContent() {
    const [markdown, setMarkdown] = useState<string>("");
    const [mode, setMode] = useState<"editor" | "render">("editor");

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
        <div className="px-6 mb-4 flex flex-col items-center">
            {/* Load file button */}
            <LoadFileButton onFileUpload={handleFileUpload} />

            {/* Main container */}
            <div className="relative w-full max-w-3xl border-[3px] pb-2 border-black rounded shadow-[3px_3px] bg-white">
                <ButtonsContainer mode={mode} setMode={setMode} />
                <TextareaContainer markdown={markdown} setMarkdown={setMarkdown} mode={mode} />
            </div>
        </div>
    );
}
