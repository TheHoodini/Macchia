import { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Navbar } from "./components/layout/Navbar";
import { MainContent } from "./components/layout/MainContent";

export function App() {
  const [mode, setMode] = useState<"editor" | "render">("editor");
  const rightClickAvailable = true;

  useEffect(() => {
    // Disable right-click context menu
    if (!rightClickAvailable) {
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };
      document.addEventListener("contextmenu", handleContextMenu);
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, [rightClickAvailable]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Navbar mode={mode} setMode={setMode} /> {/* Navbar receives mode */}
      <main className="bg-[#38dbff] flex-1 overflow-y-auto">
        <MainContent mode={mode} /> {/* MainContent receives mode */}
      </main>
    </div>
  );
}
