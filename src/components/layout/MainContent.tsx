import { useState, ChangeEvent, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import IconText from "../../assets/text.svg";
import IconCode from "../../assets/code.svg";
import IconAddFile from "../../assets/add_file.svg";

import { MButton } from "../ui/MButton";

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
        <div className="px-6 mb-4 flex flex-col items-center">
            {/* Load file button */}
            <div className="w-full max-w-3xl mb-4 mt-9">
                {/* Input */}
                <input
                    id="file-upload"
                    type="file"
                    accept=".md,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-3 pr-4 py-2 bg-white text-black rounded border-black border-[3px] shadow-[1px_1px] cursor-pointer hover:bg-gray-100 active:scale-95 transition"
                >
                    <img src={IconAddFile} alt="Text" style={{ width: '25px', height: '25px' }} />
                    Load File
                </label>
            </div>

            {/* Main container */}
            <div
                className="relative w-full max-w-3xl border-[3px] border-black rounded shadow-[3px_3px] bg-white overflow-auto "
                style={{ maxHeight: "70vh" }} // Max scroll height 
            >
                {/* Buttons */}
                <div className="sticky top-3 right-2 flex justify-end pr-3 z-10 gap-2">
                    <MButton
                        onClick={() => setMode("editor")}
                        marked={mode === "editor"} 
                        title="Editor"
                        icon={IconCode}
                        hover 
                    />
                    <MButton
                        onClick={() => setMode("render")}
                        marked={mode === "render"} 
                        title="Render"
                        icon={IconText}
                        hover 
                    />
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
                                <ReactMarkdown>{markdown.replace(/\n/g, "  \n")}</ReactMarkdown>
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
