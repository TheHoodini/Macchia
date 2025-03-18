import { ButtonsContainer } from "./ButtonsContainer";

interface NavbarProps {
  mode: "editor" | "render";
  setMode: (mode: "editor" | "render") => void;
}

export function Navbar({ mode, setMode }: NavbarProps) {
  return (
    <nav className="h-10 w-full bg-white border-black border-b-[3px] flex items-center justify-center">
      <ButtonsContainer mode={mode} setMode={setMode} />
    </nav>
  );
}
