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
  const [activeTab, setActiveTab] = useState<"overview" | "logs" | "agents">("overview");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/scribe");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Failed to fetch Scribe data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, autoRefresh ? 5000 : 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  if (loading) {
    return (
      <div style={{ padding: "1rem", color: "var(--text2)" }}>
        Loading Scribe data...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: "1rem", color: "var(--text2)" }}>
        No Scribe data available
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
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "0.25rem 0.75rem",
              background: activeTab === "overview" ? "var(--accent)" : "transparent",
              color: activeTab === "overview" ? "white" : "var(--text2)",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            style={{
              padding: "0.25rem 0.75rem",
              background: activeTab === "logs" ? "var(--accent)" : "transparent",
              color: activeTab === "logs" ? "white" : "var(--text2)",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Daily Logs
          </button>
          <button
            onClick={() => setActiveTab("agents")}
            style={{
              padding: "0.25rem 0.75rem",
              background: activeTab === "agents" ? "var(--accent)" : "transparent",
              color: activeTab === "agents" ? "white" : "var(--text2)",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Agents
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text2)" }}>
            Auto-refresh
          </span>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1rem" }}>
        {activeTab === "overview" && (
          <div>
            {/* Active Missions */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--text2)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
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
                      <div>
                        <div style={{ fontWeight: "500", color: "var(--text)" }}>{m.mission}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>
                          {m.owner} • {m.lastUpdate}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{
                          fontSize: "0.75rem",
                          padding: "0.125rem 0.5rem",
                          borderRadius: "0.25rem",
                          background: statusColors[m.status] || "#6b7280",
                          color: "white",
                        }}>
                          {m.status}
                        </span>
                        {m.blockers !== "None" && m.blockers !== "—" && (
                          <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>⚠️</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Agent Status */}
            <div>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--text2)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
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
                        minWidth: "150px",
                      }}
                    >
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: statusColors[a.status] || "#6b7280",
                      }} />
                      <div>
                        <div style={{ fontWeight: "500", color: "var(--text)", fontSize: "0.875rem" }}>{a.agent}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>{a.currentTask}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div>
            {data.dailyLogs.length === 0 ? (
              <div style={{ color: "var(--text2)" }}>No daily logs found</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {data.dailyLogs.slice(0, 7).map((log, i) => (
                  <div key={i} style={{ borderBottom: i < Math.min(data.dailyLogs.length, 7) - 1 ? "1px solid var(--border)" : "none", paddingBottom: "1rem" }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--pilo)", marginBottom: "0.5rem" }}>
                      {log.date}
                    </div>
                    
                    {log.requests.length > 0 && (
                      <div style={{ marginBottom: "0.5rem" }}>
                        <div style={{ fontSize: "0.75rem", color: "var(--text2)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Requests
                        </div>
                        {log.requests.map((r, j) => (
                          <div key={j} style={{ fontSize: "0.875rem", color: "var(--text)", marginLeft: "0.5rem" }}>
                            • {r}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {log.workDone.length > 0 && (
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text2)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Work Done
                        </div>
                        {log.workDone.map((w, j) => (
                          <div key={j} style={{ fontSize: "0.875rem", color: "var(--text)", marginLeft: "0.5rem" }}>
                            ✓ {w}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {log.blockers.length > 0 && log.blockers[0] !== "None" && log.blockers[0] !== "" && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <div style={{ fontSize: "0.75rem", color: "#ef4444", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Blockers
                        </div>
                        {log.blockers.filter(b => b).map((b, j) => (
                          <div key={j} style={{ fontSize: "0.875rem", color: "#ef4444", marginLeft: "0.5rem" }}>
                            ⚠️ {b}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "agents" && (
          <div>
            {data.executionBoard.agentStatus.length === 0 ? (
              <div style={{ color: "var(--text2)" }}>No agent status data</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {data.executionBoard.agentStatus.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--bg)",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      borderLeft: `3px solid ${statusColors[a.status] || "#6b7280"}`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "1.125rem", color: "var(--text)" }}>
                          {a.agent}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
                          {a.currentTask}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "0.25rem",
                          background: statusColors[a.status] || "#6b7280",
                          color: "white",
                          textTransform: "uppercase",
                        }}>
                          {a.status}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text2)", marginTop: "0.25rem" }}>
                          Last signal: {a.lastSignal || "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Ideas Queue */}
            {data.executionBoard.ideas.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--text2)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                  Queue
                </h3>
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
                      {idea.idea}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Last Updated */}
      <div style={{ 
        padding: "0.5rem 1rem", 
        borderTop: "1px solid var(--border)",
        fontSize: "0.75rem",
        color: "var(--text2)",
      }}>
        Last updated: {data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : "Unknown"}
      </div>
    </div>
  );
}