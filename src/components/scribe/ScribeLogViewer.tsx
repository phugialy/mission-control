"use client";

import { useState, useEffect } from "react";

interface ExecutionBoard {
  activeMissions: Array<{
    mission: string;
    owner: string;
    status: string;
    lastUpdate: string;
    blockers: string;
  }>;
  agentStatus: Array<{
    agent: string;
    currentTask: string;
    status: string;
    lastSignal: string;
  }>;
  parked: Array<{
    item: string;
    waitingFor: string;
    since: string;
  }>;
  ideas: Array<{
    date: string;
    idea: string;
  }>;
}

interface ScribeData {
  executionBoard: ExecutionBoard;
  memory: {
    date: string;
    entries: string[];
  };
  dailyLogs: Array<{
    date: string;
    requests: string[];
    workDone: string[];
    blockers: string[];
    ideas: string[];
  }>;
  lastUpdated: string;
}

const statusColors: Record<string, string> = {
  in_progress: "#f59e0b",
  active: "#22c55e",
  idle: "#6b7280",
  blocked: "#ef4444",
  done: "#22c55e",
  inbox: "#6b7280",
  planned: "#3b82f6",
  review: "#8b5cf6",
};

export default function ScribeLogViewer() {
  const [data, setData] = useState<ScribeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/scribe");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (e) {
      console.error("Failed to fetch Scribe data:", e);
      setError(e instanceof Error ? e.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        background: "var(--bg2)", 
        borderRadius: "0.5rem",
        color: "var(--text2)" 
      }}>
        Loading Scribe data...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        background: "var(--bg2)", 
        borderRadius: "0.5rem",
        color: "#ef4444" 
      }}>
        Error: {error || "No data available"}
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg2)", borderRadius: "0.5rem", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ 
        padding: "0.75rem 1rem", 
        borderBottom: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "var(--text)" }}>
          Scribe Execution Board
        </h2>
        <span style={{ fontSize: "0.75rem", color: "var(--text2)" }}>
          Updated: {data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : "Unknown"}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Active Missions */}
        <section>
          <h3 style={{ 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            color: "var(--text2)", 
            marginBottom: "0.75rem", 
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Active Missions
          </h3>
          {data.executionBoard.activeMissions.length === 0 ? (
            <div style={{ color: "var(--text2)", fontSize: "0.875rem" }}>No active missions</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {data.executionBoard.activeMissions.map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg)",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, color: "var(--text)", marginBottom: "0.25rem" }}>
                      {m.mission}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>
                      {m.owner} • {m.lastUpdate}
                      {m.blockers && m.blockers !== "None" && m.blockers !== "—" && (
                        <span style={{ color: "#ef4444", marginLeft: "0.5rem" }}>
                          ⚠️ Blocked: {m.blockers}
                        </span>
                      )}
                    </div>
                  </div>
                  <span style={{
                    fontSize: "0.7rem",
                    padding: "0.125rem 0.5rem",
                    borderRadius: "0.25rem",
                    background: statusColors[m.status] || "#6b7280",
                    color: "white",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Agent Status */}
        <section>
          <h3 style={{ 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            color: "var(--text2)", 
            marginBottom: "0.75rem", 
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Agent Status
          </h3>
          {data.executionBoard.agentStatus.length === 0 ? (
            <div style={{ color: "var(--text2)", fontSize: "0.875rem" }}>No agent status data</div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {data.executionBoard.agentStatus.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg)",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minWidth: "140px",
                  }}
                >
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: statusColors[a.status] || "#6b7280",
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontWeight: 500, color: "var(--text)", fontSize: "0.875rem" }}>{a.agent}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>{a.currentTask}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Parked */}
        <section>
          <h3 style={{ 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            color: "var(--text2)", 
            marginBottom: "0.75rem", 
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Parked
          </h3>
          {data.executionBoard.parked.length === 0 ? (
            <div style={{ color: "var(--text2)", fontSize: "0.875rem" }}>No items parked</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {data.executionBoard.parked.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg)",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                  }}
                >
                  <div style={{ fontWeight: 500, color: "var(--text)", fontSize: "0.875rem" }}>{p.item}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>
                    Waiting for: {p.waitingFor} • Since: {p.since}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Ideas */}
        <section>
          <h3 style={{ 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            color: "var(--text2)", 
            marginBottom: "0.75rem", 
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Ideas Queue
          </h3>
          {data.executionBoard.ideas.length === 0 ? (
            <div style={{ color: "var(--text2)", fontSize: "0.875rem" }}>No ideas in queue</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {data.executionBoard.ideas.map((idea, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg)",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    color: "var(--text)",
                  }}
                >
                  <span style={{ color: "var(--text2)", marginRight: "0.5rem" }}>{idea.date}</span>
                  {idea.idea}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}