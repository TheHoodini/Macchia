import { ChangeEvent, RefObject } from "react";
import { LoadFileButton } from "./LoadFileButton";
import { TextareaContainer } from "./TextareaContainer";

interface MainContentProps {
    mode: "editor" | "render";
    markdown: string;
    setMarkdown: (value: string) => void;
    textareaRef: RefObject<HTMLTextAreaElement | null>; // Allow null
    applyFormatting: (format: "bold" | "italic" | "underline") => void;
}

export function MainContent({ mode, markdown, setMarkdown, textareaRef, applyFormatting }: MainContentProps) {
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
            <LoadFileButton onFileUpload={handleFileUpload} />
            <div className="relative w-full max-w-3xl border-[3px] pb-2 border-black rounded shadow-[3px_3px] bg-white">
                <TextareaContainer
                    markdown={markdown}
                    setMarkdown={setMarkdown}
                    mode={mode}
                    textareaRef={textareaRef}
                    applyFormatting={applyFormatting} />
            </div>
        </div>
    );
}
