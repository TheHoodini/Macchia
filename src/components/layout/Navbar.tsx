import { ButtonsContainer } from "./ButtonsContainer";
import { MButton } from "../ui/MButton";

import IconBold from "../../assets/IconBold.svg";
import IconItalic from "../../assets/IconItalic.svg";
import IconUnderline from "../../assets/IconUnderline.svg";

interface NavbarProps {
    mode: "editor" | "render";
    setMode: (mode: "editor" | "render") => void;
    applyFormatting: (format: "bold" | "italic" | "underline") => void;
}

export function Navbar({ mode, setMode, applyFormatting }: NavbarProps) {
    return (
        <nav className="h-11 w-full bg-white border-black border-b-[3px] flex items-center justify-center gap-12">
            <div className="flex gap-2">
                <MButton onClick={() => applyFormatting("bold")} title="Bold" icon={IconBold} />
                <MButton onClick={() => applyFormatting("italic")} title="Italic" icon={IconItalic} />
                <MButton onClick={() => applyFormatting("underline")} title="Underline" icon={IconUnderline} />
            </div>
            <ButtonsContainer mode={mode} setMode={setMode} />
        </nav>
    );
}
