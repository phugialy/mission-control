import MainLayout from "@/components/layout/MainLayout";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div>
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: "bold", color: "var(--text)" }}>
            Mission Control Dashboard
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "1rem", color: "var(--text2)" }}>
            Overview of system health and active priorities
          </p>
        </header>

        {/* Summary Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
          gap: "1rem", 
          marginBottom: "2rem" 
        }}>
          <div style={{
            background: "var(--bg2)",
            borderRadius: "0.5rem",
            padding: "1rem",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ margin: 0, fontSize: "0.875rem", color: "var(--text2)", marginBottom: "0.5rem" }}>
              Active Missions
            </h3>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)" }}>
              12
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
              +3 since yesterday
            </div>
          </div>
          
          <div style={{
            background: "var(--bg2)",
            borderRadius: "0.5rem",
            padding: "1rem",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ margin: 0, fontSize: "0.875rem", color: "var(--text2)", marginBottom: "0.5rem" }}>
              Active Agents
            </h3>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)" }}>
              6
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
              All systems operational
            </div>
          </div>
          
          <div style={{
            background: "var(--bg2)",
            borderRadius: "0.5rem",
            padding: "1rem",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ margin: 0, fontSize: "0.875rem", color: "var(--text2)", marginBottom: "0.5rem" }}>
              Ideas Queued
            </h3>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)" }}>
              18
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
              4 awaiting review
            </div>
          </div>
          
          <div style={{
            background: "var(--bg2)",
            borderRadius: "0.5rem",
            padding: "1rem",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ margin: 0, fontSize: "0.875rem", color: "var(--text2)", marginBottom: "0.5rem" }}>
              Priority Items
            </h3>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)" }}>
              3
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
              1 urgent, 2 high priority
            </div>
          </div>
        </div>

        {/* Recently Active Missions */}
        <div style={{
          background: "var(--bg2)",
          borderRadius: "0.5rem",
          padding: "1rem",
          border: "1px solid var(--border)",
          marginBottom: "2rem"
        }}>
          <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem", color: "var(--text)" }}>
            Recently Active Missions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.75rem",
              background: "var(--bg)",
              borderRadius: "0.375rem"
            }}>
              <div>
                <div style={{ fontWeight: "500", color: "var(--text)" }}>
                  API Integration Enhancement
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
                  In progress • Pete assigned
                </div>
              </div>
              <div style={{ 
                padding: "0.25rem 0.5rem", 
                borderRadius: "0.25rem", 
                background: "#f59e0b", 
                color: "white", 
                fontSize: "0.75rem" 
              }}>
                In Progress
              </div>
            </div>
            
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.75rem",
              background: "var(--bg)",
              borderRadius: "0.375rem"
            }}>
              <div>
                <div style={{ fontWeight: "500", color: "var(--text)" }}>
                  Security Audit & Hardening
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
                  Review phase • Ready for testing
                </div>
              </div>
              <div style={{ 
                padding: "0.25rem 0.5rem", 
                borderRadius: "0.25rem", 
                background: "#8b5cf6", 
                color: "white", 
                fontSize: "0.75rem" 
              }}>
                Review
              </div>
            </div>
            
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.75rem",
              background: "var(--bg)",
              borderRadius: "0.375rem"
            }}>
              <div>
                <div style={{ fontWeight: "500", color: "var(--text)" }}>
                  UI Redesign Implementation
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
                  Completed • Awaiting deployment
                </div>
              </div>
              <div style={{ 
                padding: "0.25rem 0.5rem", 
                borderRadius: "0.25rem", 
                background: "#22c55e", 
                color: "white", 
                fontSize: "0.75rem" 
              }}>
                Done
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: "var(--bg2)",
          borderRadius: "0.5rem",
          padding: "1rem",
          border: "1px solid var(--border)"
        }}>
          <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem", color: "var(--text)" }}>
            Quick Actions
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            <button style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem",
              padding: "1rem",
              cursor: "pointer",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📋</div>
              <div>New Mission</div>
            </button>
            
            <button style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem",
              padding: "1rem",
              cursor: "pointer",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🤖</div>
              <div>Manage Agents</div>
            </button>
            
            <button style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem",
              padding: "1rem",
              cursor: "pointer",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💡</div>
              <div>Add Idea</div>
            </button>
            
            <button style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem",
              padding: "1rem",
              cursor: "pointer",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔧</div>
              <div>Settings</div>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}