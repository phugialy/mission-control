import MainLayout from "@/components/layout/MainLayout";

// Mock data for agents - in reality this would come from an API
const mockAgents = [
  { id: "agent-1", name: "Pete", role: "Technical Core", status: "busy", currentTask: "Implementing UI redesign", lastUpdate: "Just now" },
  { id: "agent-2", name: "Buster", role: "Quality Control", status: "idle", currentTask: "Waiting for features to test", lastUpdate: "5 mins ago" },
  { id: "agent-3", name: "Scribe", role: "Execution Tracker", status: "active", currentTask: "Logging executions", lastUpdate: "2 mins ago" },
  { id: "agent-4", name: "Rex", role: "Research Specialist", status: "idle", currentTask: "Scanning for research tasks", lastUpdate: "10 mins ago" },
  { id: "agent-5", name: "Quill", role: "Documentation Writer", status: "busy", currentTask: "Writing agent guides", lastUpdate: "3 mins ago" },
  { id: "agent-6", name: "Kai", role: "Operator", status: "idle", currentTask: "Managing workflow", lastUpdate: "1 min ago" },
];

// Status indicator component
const StatusIndicator = ({ status }: { status: string }) => {
  const colors = {
    active: "#22c55e", // green
    busy: "#f59e0b",  // amber
    idle: "#6b7280",  // gray
    error: "#ef4444", // red
  };

  return (
    <span style={{
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: colors[status as keyof typeof colors] || "#6b7280",
      marginRight: "0.5rem"
    }} />
  );
};

export default function AgentsPage() {
  return (
    <MainLayout>
      <div>
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: "bold", color: "var(--text)" }}>
            Agents Directory
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "1rem", color: "var(--text2)" }}>
            Monitor agent status and activity across the system
          </p>
        </header>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
          gap: "1rem" 
        }}>
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: "var(--bg2)",
                borderRadius: "0.5rem",
                padding: "1rem",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: "0.75rem" 
              }}>
                <StatusIndicator status={agent.status} />
                <h3 style={{ 
                  margin: 0, 
                  fontSize: "1.125rem", 
                  fontWeight: "600", 
                  color: "var(--text)",
                  textTransform: "capitalize"
                }}>
                  {agent.name}
                </h3>
                <span style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.75rem",
                  color: "var(--text2)",
                  background: "var(--bg)",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "9999px",
                }}>
                  {agent.role}
                </span>
              </div>
              
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ 
                  fontSize: "0.875rem", 
                  color: "var(--text2)",
                  marginBottom: "0.25rem"
                }}>
                  Status: 
                  <span style={{ 
                    marginLeft: "0.5rem", 
                    textTransform: "capitalize",
                    fontWeight: "500",
                    color: "var(--text)" 
                  }}>
                    {agent.status}
                  </span>
                </div>
                
                <div style={{ 
                  fontSize: "0.875rem", 
                  color: "var(--text2)",
                  marginBottom: "0.25rem"
                }}>
                  Current Activity:</div>
                <div style={{ 
                  marginLeft: "1rem", 
                  fontStyle: "italic",
                  color: "var(--text)" 
                }}>
                  {agent.currentTask}
                </div>
              </div>
              
              <div style={{ 
                fontSize: "0.75rem", 
                color: "var(--text2)",
                borderTop: "1px dashed var(--border)",
                paddingTop: "0.75rem"
              }}>
                Last update: {agent.lastUpdate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}