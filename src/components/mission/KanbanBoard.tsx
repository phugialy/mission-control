"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MissionDetail from "./MissionDetail";

const STATUSES = [
  { key: "inbox", label: "Inbox", color: "#6b7280" },
  { key: "planned", label: "Planned", color: "#3b82f6" },
  { key: "in_progress", label: "In Progress", color: "#f59e0b" },
  { key: "blocked", label: "Blocked", color: "#ef4444" },
  { key: "review", label: "Review", color: "#8b5cf6" },
  { key: "done", label: "Done", color: "#22c55e" },
  { key: "archived", label: "Archived", color: "#9ca3af" },
];

interface Task {
  id: string;
  title: string;
  status: string;
}

interface Objective {
  id: string;
  title: string;
  status: string;
  tasks: Task[];
}

interface Mission {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  createdAt: string;
  objectives: Objective[];
}

export default function KanbanBoard() {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newMission, setNewMission] = useState({ title: "", description: "", priority: "medium" });
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const fetchMissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/missions");
      const data = await res.json();
      setMissions(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMissions(); }, []);

  const createMission = async () => {
    if (!newMission.title.trim()) return;
    try {
      await fetch("/api/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newMission, status: "inbox" }),
      });
      setNewMission({ title: "", description: "", priority: "medium" });
      setShowModal(false);
      fetchMissions();
    } catch (e) { console.error(e); }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/missions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchMissions();
    } catch (e) { console.error(e); }
  };

  const getMissionsByStatus = (status: string) => missions.filter(m => m.status === status);

  const priorityColor = (p?: string) => {
    switch (p) {
      case "urgent": return "#ef4444";
      case "high": return "#f97316";
      case "medium": return "#eab308";
      case "low": return "#22c55e";
      default: return "#6b7280";
    }
  };

  const handleMissionClick = (mission: Mission, e: React.MouseEvent) => {
    // Only open detail if not clicking on the card itself (for drag)
    e.preventDefault();
    setSelectedMission(mission);
  };

  if (loading) return <div style={{ color: "var(--text2)" }}>Loading missions...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--text)" }}>
          Missions
        </h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "var(--accent)",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          + New Mission
        </button>
      </div>

      {/* Kanban Columns */}
      <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "1rem" }}>
        {STATUSES.filter(s => s.key !== "archived").map(({ key, label, color }) => (
          <div
            key={key}
            style={{
              minWidth: "240px",
              background: "var(--bg2)",
              borderRadius: "0.5rem",
              padding: "0.75rem",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("missionId");
              if (id) updateStatus(id, key);
            }}
          >
            {/* Column Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
              <span style={{ fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", color: "var(--text2)" }}>
                {label}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text2)", marginLeft: "auto" }}>
                {getMissionsByStatus(key).length}
              </span>
            </div>

            {/* Mission Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {getMissionsByStatus(key).map((mission) => (
                <div
                  key={mission.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("missionId", mission.id)}
                  onClick={(e) => handleMissionClick(mission, e)}
                  style={{
                    background: "var(--bg)",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    cursor: "grab",
                    borderLeft: `3px solid ${priorityColor(mission.priority)}`,
                  }}
                >
                  <div style={{ fontWeight: "500", color: "var(--text)", marginBottom: "0.25rem" }}>
                    {mission.title}
                  </div>
                  {mission.description && (
                    <div style={{ fontSize: "0.75rem", color: "var(--text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {mission.description}
                    </div>
                  )}
                  {mission.objectives && mission.objectives.length > 0 && (
                    <div style={{ fontSize: "0.625rem", color: "var(--accent)", marginTop: "0.5rem" }}>
                      {mission.objectives.length} objective{mission.objectives.length !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
        }} onClick={() => setShowModal(false)}>
          <div style={{ background: "var(--bg2)", padding: "1.5rem", borderRadius: "0.5rem", width: "400px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", color: "var(--text)" }}>New Mission</h3>
            <input
              placeholder="Title"
              value={newMission.title}
              onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)" }}
            />
            <textarea
              placeholder="Description (optional)"
              value={newMission.description}
              onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", minHeight: "80px" }}
            />
            <select
              value={newMission.priority}
              onChange={(e) => setNewMission({ ...newMission, priority: e.target.value })}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)" }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "0.5rem 1rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", cursor: "pointer" }}>Cancel</button>
              <button onClick={createMission} style={{ padding: "0.5rem 1rem", background: "var(--accent)", border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer" }}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Mission Detail Panel */}
      {selectedMission && (
        <MissionDetail 
          mission={selectedMission} 
          onClose={() => setSelectedMission(null)} 
          onUpdate={fetchMissions}
        />
      )}
    </div>
  );
}
