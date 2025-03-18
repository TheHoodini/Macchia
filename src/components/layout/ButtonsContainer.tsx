// src/components/ButtonsContainer.tsx
import { MButton } from "../ui/MButton";
import IconText from "../../assets/text.svg";
import IconCode from "../../assets/code.svg";

interface ButtonsContainerProps {
    mode: "editor" | "render";
    setMode: (mode: "editor" | "render") => void;
}

export function ButtonsContainer({ mode, setMode }: ButtonsContainerProps) {
    return (
        <div className="sticky top-3 right-2 flex justify-end pr-3 z-10 gap-2">
            <MButton
                onClick={() => setMode("editor")}
                marked={mode === "editor"}
                title="Editor"
                icon={IconCode}
                shadow
            />
            <MButton
                onClick={() => setMode("render")}
                marked={mode === "render"}
                title="Render"
                icon={IconText}
                shadow
            />
        </div>
    );
}
