import MainLayout from "@/components/layout/MainLayout";

// Mock data for ideas
const mockIdeas = [
  { id: "idea-1", date: "2024-04-15", content: "Add AI suggestion feature for mission creation", source: "Kai", status: "pending" },
  { id: "idea-2", date: "2024-04-14", content: "Improve mobile responsiveness for mission boards", source: "Pete", status: "planned" },
  { id: "idea-3", date: "2024-04-13", content: "Implement real-time collaboration on missions", source: "Buster", status: "conceived" },
  { id: "idea-4", date: "2024-04-12", content: "Add export functionality for mission analytics", source: "Scribe", status: "pending" },
  { id: "idea-5", date: "2024-04-11", content: "Create agent performance dashboard", source: "Rex", status: "conceived" },
];

export default function IdeasPage() {
  return (
    <MainLayout>
      <div>
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: "bold", color: "var(--text)" }}>
            Idea Queue
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "1rem", color: "var(--text2)" }}>
            Collect and track ideas for future development
          </p>
        </header>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
          gap: "1rem" 
        }}>
          {mockIdeas.map((idea) => (
            <div
              key={idea.id}
              style={{
                background: "var(--bg2)",
                borderRadius: "0.5rem",
                padding: "1rem",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "0.75rem"
              }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: "1.125rem", 
                  fontWeight: "600", 
                  color: "var(--text)"
                }}>
                  {idea.content}
                </h3>
                <span style={{
                  fontSize: "0.75rem",
                  color: "var(--text2)",
                  background: "var(--bg)",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "9999px",
                  alignSelf: "flex-start"
                }}>
                  {idea.date}
                </span>
              </div>
              
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ 
                  fontSize: "0.875rem", 
                  color: "var(--text2)",
                  marginBottom: "0.25rem"
                }}>
                  Source: 
                  <span style={{ 
                    marginLeft: "0.5rem", 
                    fontWeight: "500",
                    color: "var(--text)" 
                  }}>
                    {idea.source}
                  </span>
                </div>
              </div>
              
              <div style={{ 
                fontSize: "0.75rem", 
                color: "var(--text2)",
                borderTop: "1px dashed var(--border)",
                paddingTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <div>Status: <span style={{ fontWeight: "500", color: "var(--text)" }}>{idea.status}</span></div>
                <div>
                  <button style={{
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  }}>Review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}