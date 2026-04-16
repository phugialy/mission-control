import KanbanBoard from "@/components/mission/KanbanBoard";
import MainLayout from "@/components/layout/MainLayout";

export default function MissionsPage() {
  return (
    <MainLayout>
      <div>
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: "bold", color: "var(--text)" }}>
            Missions
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "1rem", color: "var(--text2)" }}>
            Track and manage missions across their lifecycle
          </p>
        </header>
        
        <div>
          <KanbanBoard />
        </div>
      </div>
    </MainLayout>
  );
}