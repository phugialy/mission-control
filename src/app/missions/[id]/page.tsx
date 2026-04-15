"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface Mission {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  objectives: Objective[];
}

interface Objective {
  id: string;
  title: string;
  status: string;
  order: number;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  status: string;
  assignee?: string;
  order: number;
}

interface Activity {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

export default function MissionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [mission, setMission] = useState<Mission | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", description: "", status: "", priority: "" });
  
  // Objectives/Tasks state
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [newObjectiveTitle, setNewObjectiveTitle] = useState("");
  const [showAddObjective, setShowAddObjective] = useState(false);
  const [editingObjective, setEditingObjective] = useState<string | null>(null);
  const [expandedObjective, setExpandedObjective] = useState<string | null>(null);
  
  // Task state per objective
  const [newTaskTitles, setNewTaskTitles] = useState<Record<string, string>>({});
  const [showAddTask, setShowAddTask] = useState<Record<string, boolean>>({});
  const [editingTask, setEditingTask] = useState<string | null>(null);

  useEffect(() => { fetchMission(); }, [id]);

  const fetchMission = async () => {
    try {
      const res = await fetch(`/api/missions/${id}`);
      if (res.ok) {
        const data = await res.json();
        setMission(data);
        setObjectives(data.objectives || []);
        setEditForm({ title: data.title, description: data.description || "", status: data.status, priority: data.priority || "" });
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
    fetchActivities();
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch(`/api/activities?missionId=${id}`);
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (e) { console.error(e); }
  };

  const saveMission = async () => {
    await fetch(`/api/missions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditing(false);
    fetchMission();
  };

  // Objective CRUD
  const addObjective = async () => {
    if (!newObjectiveTitle.trim()) return;
    await fetch(`/api/objectives`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ missionId: id, title: newObjectiveTitle }),
    });
    setNewObjectiveTitle("");
    setShowAddObjective(false);
    fetchMission();
  };

  const updateObjective = async (objId: string, data: { title?: string; status?: string }) => {
    await fetch(`/api/objectives`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: objId, ...data }),
    });
    setEditingObjective(null);
    fetchMission();
  };

  const deleteObjective = async (objId: string) => {
    if (!confirm("Delete this objective and all its tasks?")) return;
    await fetch(`/api/objectives?id=${objId}`, { method: "DELETE" });
    fetchMission();
  };

  // Task CRUD
  const addTask = async (objectiveId: string) => {
    const title = newTaskTitles[objectiveId];
    if (!title?.trim()) return;
    await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objectiveId, title }),
    });
    setNewTaskTitles({ ...newTaskTitles, [objectiveId]: "" });
    setShowAddTask({ ...showAddTask, [objectiveId]: false });
    fetchMission();
  };

  const updateTask = async (taskId: string, data: { title?: string; status?: string; assignee?: string }) => {
    await fetch(`/api/tasks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, ...data }),
    });
    setEditingTask(null);
    fetchMission();
  };

  const deleteTask = async (taskId: string) => {
    await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" });
    fetchMission();
  };

  const updateStatus = async (status: string) => {
    await fetch(`/api/missions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchMission();
  };

  const deleteMission = async () => {
    if (!confirm("Delete this mission?")) return;
    await fetch(`/api/missions/${id}`, { method: "DELETE" });
    router.push("/");
  };

  const priorityColor = (p?: string) => {
    switch (p) {
      case "urgent": return "#ef4444";
      case "high": return "#f97c16";
      case "medium": return "#eab308";
      case "low": return "#22c55e";
      default: return "#6b7280";
    }
  };

  if (loading) return <div style={{ padding: "2rem", color: "var(--text2)" }}>Loading...</div>;
  if (!mission) return <div style={{ padding: "2rem", color: "var(--text2)" }}>Mission not found</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem" }}>
      {/* Header */}
      <button onClick={() => router.push("/")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", marginBottom: "1rem", padding: 0 }}>
        ← Back to Board
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          {editing ? (
            <input
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              style={{ fontSize: "1.5rem", fontWeight: "bold", background: "var(--bg)", border: "1px solid var(--border)", padding: "0.25rem", color: "var(--text)", borderRadius: "0.25rem", width: "100%" }}
            />
          ) : (
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>{mission.title}</h1>
          )}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <span style={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", background: "var(--bg2)", color: "var(--text2)" }}>
              {mission.status}
            </span>
            {mission.priority && (
              <span style={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", background: priorityColor(mission.priority), color: "white" }}>
                {mission.priority}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {editing ? (
            <>
              <button onClick={() => setEditing(false)} style={{ padding: "0.5rem 0.75rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", cursor: "pointer" }}>Cancel</button>
              <button onClick={saveMission} style={{ padding: "0.5rem 0.75rem", background: "var(--accent)", border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer" }}>Save</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} style={{ padding: "0.5rem 0.75rem", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", cursor: "pointer" }}>Edit</button>
              <button onClick={deleteMission} style={{ padding: "0.5rem 0.75rem", background: "#ef4444", border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer" }}>Delete</button>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--text2)", marginBottom: "0.5rem", textTransform: "uppercase" }}>Description</h3>
        {editing ? (
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", minHeight: "100px" }}
          />
        ) : (
          <p style={{ color: "var(--text)", lineHeight: "1.6" }}>{mission.description || "No description"}</p>
        )}
      </div>

      {/* Status Change */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--text2)", marginBottom: "0.5rem", textTransform: "uppercase" }}>Change Status</h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["inbox", "planned", "in_progress", "blocked", "review", "done", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              style={{
                padding: "0.375rem 0.75rem",
                background: mission.status === s ? "var(--accent)" : "var(--bg2)",
                border: "none",
                borderRadius: "0.25rem",
                color: mission.status === s ? "white" : "var(--text)",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Objectives CRUD Panel */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--text2)", textTransform: "uppercase" }}>Objectives</h3>
          <button 
            onClick={() => setShowAddObjective(true)}
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", background: "var(--accent)", border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer" }}
          >+ Add Objective</button>
        </div>
        
        {showAddObjective && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <input
              value={newObjectiveTitle}
              onChange={(e) => setNewObjectiveTitle(e.target.value)}
              placeholder="Objective title"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && addObjective()}
              style={{ flex: 1, padding: "0.5rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)" }}
            />
            <button onClick={addObjective} style={{ padding: "0.5rem", background: "var(--accent)", border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer" }}>Add</button>
            <button onClick={() => { setShowAddObjective(false); setNewObjectiveTitle(""); }} style={{ padding: "0.5rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", cursor: "pointer" }}>Cancel</button>
          </div>
        )}
        
        {objectives.length === 0 ? (
          <p style={{ color: "var(--text2)", fontSize: "0.875rem" }}>No objectives yet. Click "Add Objective" to create one.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {objectives.map((obj) => (
              <div key={obj.id} style={{ background: "var(--bg2)", borderRadius: "0.25rem", overflow: "hidden" }}>
                {/* Objective header */}
                <div style={{ padding: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {editingObjective === obj.id ? (
                    <div style={{ display: "flex", gap: "0.5rem", flex: 1 }}>
                      <input
                        defaultValue={obj.title}
                        id={`obj-title-${obj.id}`}
                        onKeyDown={(e) => e.key === "Enter" && (document.getElementById(`obj-status-${obj.id}`) as HTMLSelectElement)?.focus()}
                        style={{ flex: 1, padding: "0.25rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)" }}
                      />
                      <select
                        defaultValue={obj.status}
                        id={`obj-status-${obj.id}`}
                        onKeyDown={(e) => e.key === "Enter" && updateObjective(obj.id, { title: (document.getElementById(`obj-title-${obj.id}`) as HTMLInputElement).value, status: (e.target as HTMLSelectElement).value })}
                        style={{ padding: "0.25rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)" }}
                      >
                        {["inbox", "in_progress", "done"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button 
                        onClick={() => updateObjective(obj.id, { 
                          title: (document.getElementById(`obj-title-${obj.id}`) as HTMLInputElement).value, 
                          status: (document.getElementById(`obj-status-${obj.id}`) as HTMLSelectElement).value 
                        })}
                        style={{ padding: "0.25rem 0.5rem", background: "var(--accent)", border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer", fontSize: "0.75rem" }}
                      >Save</button>
                      <button onClick={() => setEditingObjective(null)} style={{ padding: "0.25rem 0.5rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", cursor: "pointer", fontSize: "0.75rem" }}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, cursor: "pointer" }} onClick={() => setExpandedObjective(expandedObjective === obj.id ? null : obj.id)}>
                        <span style={{ color: "var(--text)", fontWeight: 500 }}>{obj.title}</span>
                        <span style={{ fontSize: "0.75rem", color: obj.status === "done" ? "#22c55e" : "var(--text2)" }}>
                          {obj.status === "done" ? "✓" : "○"} {obj.status}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button onClick={() => setEditingObjective(obj.id)} style={{ padding: "0.25rem", background: "transparent", border: "none", color: "var(--text2)", cursor: "pointer", fontSize: "0.75rem" }}>Edit</button>
                        <button onClick={() => deleteObjective(obj.id)} style={{ padding: "0.25rem", background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Tasks for this objective */}
                {expandedObjective === obj.id && (
                  <div style={{ padding: "0 0.75rem 0.75rem", borderTop: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                      <button 
                        onClick={() => setShowAddTask({ ...showAddTask, [obj.id]: true })}
                        style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text2)", cursor: "pointer" }}
                      >+ Add Task</button>
                    </div>
                    
                    {showAddTask[obj.id] && (
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <input
                          value={newTaskTitles[obj.id] || ""}
                          onChange={(e) => setNewTaskTitles({ ...newTaskTitles, [obj.id]: e.target.value })}
                          placeholder="Task title"
                          autoFocus
                          onKeyDown={(e) => e.key === "Enter" && addTask(obj.id)}
                          style={{ flex: 1, padding: "0.25rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", fontSize: "0.875rem" }}
                        />
                        <button onClick={() => addTask(obj.id)} style={{ padding: "0.25rem 0.5rem", background: "var(--accent)", border: "none", borderRadius: "0.25rem", color: "white", cursor: "pointer", fontSize: "0.75rem" }}>Add</button>
                        <button onClick={() => setShowAddTask({ ...showAddTask, [obj.id]: false })} style={{ padding: "0.25rem 0.5rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "0.25rem", color: "var(--text)", cursor: "pointer", fontSize: "0.75rem" }}>Cancel</button>
                      </div>
                    )}
                    
                    {obj.tasks?.length === 0 ? (
                      <p style={{ color: "var(--text2)", fontSize: "0.75rem" }}>No tasks yet</p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {obj.tasks?.map((task) => (
                          <div key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0.5rem", background: "var(--bg)", borderRadius: "0.25rem" }}>
                            {editingTask === task.id ? (
                              <div style={{ display: "flex", gap: "0.25rem", flex: 1 }}>
                                <input
                                  defaultValue={task.title}
                                  id={`task-title-${task.id}`}
                                  style={{ flex: 1, padding: "0.125rem", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "0.125rem", color: "var(--text)", fontSize: "0.875rem" }}
                                />
                                <select
                                  defaultValue={task.status}
                                  id={`task-status-${task.id}`}
                                  style={{ padding: "0.125rem", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "0.125rem", color: "var(--text)", fontSize: "0.75rem" }}
                                >
                                  {["inbox", "in_progress", "done"].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <button 
                                  onClick={() => updateTask(task.id, { 
                                    title: (document.getElementById(`task-title-${task.id}`) as HTMLInputElement).value, 
                                    status: (document.getElementById(`task-status-${task.id}`) as HTMLSelectElement).value 
                                  })}
                                  style={{ padding: "0.125rem 0.25rem", background: "var(--accent)", border: "none", borderRadius: "0.125rem", color: "white", cursor: "pointer", fontSize: "0.7rem" }}
                                >Save</button>
                                <button onClick={() => setEditingTask(null)} style={{ padding: "0.125rem 0.25rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "0.125rem", color: "var(--text)", cursor: "pointer", fontSize: "0.7rem" }}>Cancel</button>
                              </div>
                            ) : (
                              <>
                                <span style={{ fontSize: "0.875rem", color: task.status === "done" ? "#22c55e" : "var(--text)" }}>
                                  {task.status === "done" ? "✓" : "○"} {task.title}
                                </span>
                                <div style={{ display: "flex", gap: "0.25rem" }}>
                                  <button onClick={() => setEditingTask(task.id)} style={{ padding: "0.125rem", background: "transparent", border: "none", color: "var(--text2)", cursor: "pointer", fontSize: "0.7rem" }}>Edit</button>
                                  <button onClick={() => deleteTask(task.id)} style={{ padding: "0.125rem", background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.7rem" }}>×</button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Feed */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--text2)", marginBottom: "0.5rem", textTransform: "uppercase" }}>Activity</h3>
        {activities.length === 0 ? (
          <p style={{ color: "var(--text2)", fontSize: "0.875rem" }}>No activity yet</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", maxHeight: "200px", overflowY: "auto" }}>
            {activities.map((act) => (
              <div key={act.id} style={{ fontSize: "0.75rem", color: "var(--text2)", padding: "0.25rem 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text)" }}>{act.message}</span>
                <span style={{ marginLeft: "0.5rem" }}>· {new Date(act.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ fontSize: "0.75rem", color: "var(--text2)", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
        Created: {new Date(mission.createdAt).toLocaleString()} · Updated: {new Date(mission.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}
