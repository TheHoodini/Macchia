// src/App.tsx
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="bg-cyan-100 flex-1 overflow-y-auto">
        <Content />
      </main>
    </div>
  );
}
