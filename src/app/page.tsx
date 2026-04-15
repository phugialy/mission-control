import KanbanBoard from "@/components/mission/KanbanBoard";
import ScribeLogViewer from "@/components/scribe/ScribeLogViewer";

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <header className="border-b" style={{ borderColor: "var(--border)", background: "var(--bg2)" }}>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold" style={{ color: "var(--pilo)" }}>
            Mission Control
          </h1>
          <p className="text-sm" style={{ color: "var(--text2)" }}>
            AI Agent Orchestration Suite
          </p>
        </div>
      </header>
      
      <main className="p-6">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "1rem", alignItems: "start" }}>
          <KanbanBoard />
          <ScribeLogViewer />
        </div>
      </main>
    </div>
  );
}