// src/components/LoadFileButton.tsx
import IconAddFile from "../../assets/add_file.svg";

interface LoadFileButtonProps {
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LoadFileButton({ onFileUpload }: LoadFileButtonProps) {
    return (
        <div className="w-full max-w-3xl mb-4 mt-9">
            <input
                id="file-upload"
                type="file"
                accept=".md,.txt"
                onChange={onFileUpload}
                className="hidden"
            />

            <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-3 pr-4 py-2 bg-white text-black rounded border-black border-[3px] shadow-[1px_1px] cursor-pointer hover:bg-gray-100 active:scale-95 transition"
            >
                <img src={IconAddFile} alt="Load File" style={{ width: "25px", height: "25px" }} />
                Load File
            </label>
        </div>
    );
}
