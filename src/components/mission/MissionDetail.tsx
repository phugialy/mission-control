"use client";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  status: string;
  assignee?: string;
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
  createdBy?: string;
  objectives: Objective[];
}

const STATUSES = [
  { key: "inbox", label: "Inbox", color: "#6b7280" },
  { key: "planned", label: "Planned", color: "#3b82f6" },
  { key: "in_progress", label: "In Progress", color: "#f59e0b" },
  { key: "blocked", label: "Blocked", color: "#ef4444" },
  { key: "review", label: "Review", color: "#8b5cf6" },
  { key: "done", label: "Done", color: "#22c55e" },
];

interface MissionDetailProps {
  mission: Mission;
  onClose: () => void;
  onUpdate: () => void;
}

export default function MissionDetail({ mission, onClose, onUpdate }: MissionDetailProps) {
  const [objectives, setObjectives] = useState<Objective[]>(mission.objectives || []);
  const [newObjective, setNewObjective] = useState("");
  const [newTask, setNewTask] = useState<{ [key: string]: string }>({});
  const [activeObj, setActiveObj] = useState<string | null>(null);

  // Refresh objectives when mission changes
  useEffect(() => {
    setObjectives(mission.objectives || []);
  }, [mission.objectives]);

  const addObjective = async () => {
    if (!newObjective.trim()) return;
    try {
      const res = await fetch(`/api/missions/${mission.id}/objectives`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newObjective }),
      });
      if (res.ok) {
        const obj = await res.json();
        setObjectives([...objectives, { ...obj, tasks: [] }]);
        setNewObjective("");
        onUpdate();
      }
    } catch (e) { console.error(e); }
  };

  const addTask = async (objectiveId: string) => {
    const title = newTask[objectiveId];
    if (!title?.trim()) return;
    try {
      const res = await fetch(`/api/missions/${mission.id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, objectiveId }),
      });
      if (res.ok) {
        const task = await res.json();
        setObjectives(objectives.map(o => 
          o.id === objectiveId 
            ? { ...o, tasks: [...o.tasks, task] } 
            : o
        ));
        setNewTask({ ...newTask, [objectiveId]: "" });
        onUpdate();
      }
    } catch (e) { console.error(e); }
  };

  const updateObjectiveStatus = async (objId: string, status: string) => {
    try {
      await fetch(`/api/objectives/${objId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setObjectives(objectives.map(o => 
        o.id === objId ? { ...o, status } : o
      ));
      onUpdate();
    } catch (e) { console.error(e); }
  };

  const updateTaskStatus = async (objId: string, taskId: string, status: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setObjectives(objectives.map(o => 
        o.id === objId 
          ? { ...o, tasks: o.tasks.map(t => t.id === taskId ? { ...t, status } : t) }
          : o
      ));
      onUpdate();
    } catch (e) { console.error(e); }
  };

  const deleteObjective = async (objId: string) => {
    if (!confirm("Delete this objective?")) return;
    try {
      await fetch(`/api/objectives/${objId}`, { method: "DELETE" });
      setObjectives(objectives.filter(o => o.id !== objId));
      onUpdate();
    } catch (e) { console.error(e); }
  };

  const getStatusColor = (status: string) => {
    const s = STATUSES.find(s => s.key === status);
    return s?.color || "#6b7280";
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", 
      display: "flex", justifyContent: "flex-end", zIndex: 50
    }} onClick={onClose}>
      <div style={{
        width: "500px", maxWidth: "100%", background: "var(--bg2)", 
        height: "100%", overflow: "auto", padding: "1.5rem",
        borderLeft: "1px solid var(--border)"
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)", margin: 0 }}>
              {mission.title}
            </h2>
            {mission.description && (
              <p style={{ color: "var(--text2)", marginTop: "0.5rem" }}>{mission.description}</p>
            )}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
              <span style={{ 
                padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem",
                background: getStatusColor(mission.status), color: "white" 
              }}>
                {mission.status}
              </span>
              {mission.priority && (
                <span style={{ 
                  padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem",
                  background: "var(--accent)", color: "white" 
                }}>
                  {mission.priority}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ 
            background: "none", border: "none", color: "var(--text2)", 
            fontSize: "1.5rem", cursor: "pointer" 
          }}>×</button>
        </div>

        {/* Objectives Section */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "var(--text)", marginBottom: "1rem" }}>
            Objectives
          </h3>

          {/* Add Objective */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              placeholder="New objective..."
              value={newObjective}
              onChange={e => setNewObjective(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addObjective()}
              style={{ 
                flex: 1, padding: "0.5rem", background: "var(--bg)", 
                border: "1px solid var(--border)", borderRadius: "0.25rem", 
                color: "var(--text)" 
              }}
            />
            <button onClick={addObjective} style={{ 
              padding: "0.5rem 1rem", background: "var(--accent)", 
              border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer" 
            }}>Add</button>
          </div>

          {/* Objectives List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {objectives.length === 0 && (
              <p style={{ color: "var(--text2)", fontSize: "0.875rem" }}>No objectives yet. Add one above.</p>
            )}
            {objectives.map(obj => (
              <div key={obj.id} style={{ 
                background: "var(--bg)", borderRadius: "0.5rem", padding: "1rem",
                borderLeft: `3px solid ${getStatusColor(obj.status)}`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <select
                    value={obj.status}
                    onChange={e => updateObjectiveStatus(obj.id, e.target.value)}
                    style={{ 
                      padding: "0.25rem", background: "transparent", 
                      border: "1px solid var(--border)", borderRadius: "0.25rem", 
                      color: "var(--text)", fontSize: "0.75rem" 
                    }}
                  >
                    {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                  <button onClick={() => deleteObjective(obj.id)} style={{ 
                    background: "none", border: "none", color: "var(--text2)", 
                    cursor: "pointer", fontSize: "0.875rem" 
                  }}>🗑️</button>
                </div>
                <div style={{ fontWeight: "500", color: "var(--text)", marginBottom: "0.75rem" }}>
                  {obj.title}
                </div>

                {/* Tasks */}
                <div style={{ paddingLeft: "1rem", borderLeft: "2px solid var(--border)" }}>
                  {obj.tasks.map(task => (
                    <div key={task.id} style={{ 
                      display: "flex", alignItems: "center", gap: "0.5rem", 
                      padding: "0.25rem 0" 
                    }}>
                      <input 
                        type="checkbox" 
                        checked={task.status === "done"}
                        onChange={e => updateTaskStatus(obj.id, task.id, e.target.checked ? "done" : "inbox")}
                      />
                      <span style={{ 
                        color: task.status === "done" ? "var(--text2)" : "var(--text)",
                        textDecoration: task.status === "done" ? "line-through" : "none",
                        fontSize: "0.875rem"
                      }}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <input
                      placeholder="Add task..."
                      value={newTask[obj.id] || ""}
                      onChange={e => setNewTask({ ...newTask, [obj.id]: e.target.value })}
                      onKeyDown={e => e.key === "Enter" && addTask(obj.id)}
                      style={{ 
                        flex: 1, padding: "0.25rem 0.5rem", fontSize: "0.875rem",
                        background: "var(--bg2)", border: "1px solid var(--border)", 
                        borderRadius: "0.25rem", color: "var(--text)" 
                      }}
                    />
                    <button onClick={() => addTask(obj.id)} style={{ 
                      padding: "0.25rem 0.5rem", fontSize: "0.75rem",
                      background: "var(--accent)", border: "none", 
                      borderRadius: "0.25rem", color: "white", cursor: "pointer" 
                    }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
