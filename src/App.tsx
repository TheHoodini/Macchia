// src/App.tsx
import { Header } from "./components/layout/Header";
import { MainContent } from "./components/layout/MainContent";
import { useEffect } from "react";

export function App() {
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
      <main className="bg-cyan-100 flex-1 overflow-y-auto">
        <MainContent />
      </main>
    </div>
  );
}
