"use client";

import { useState, useEffect } from "react";

const STATUSES = ["inbox", "planned", "in_progress", "blocked", "review", "done", "archived"];

interface Mission {  
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  createdAt: string;
  objectives: any[];
}

export default function MissionBoard() {  
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => { fetchMissions(); }, []);
  
  const fetchMissions = async () => {
    try {
      const res = await fetch("/api/missions");
      const data = await res.json();
      setMissions(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  
  const getStatusCount = (status: string) => missions.filter(m => m.status === status).length;
  
  if (loading) return <div style={{ color: "var(--text2)" }}>Loading...</div>;
  
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {STATUSES.map(status => (
          <div key={status} style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "var(--bg2)" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text2)" }}>
              {status.replace("_", " ")}
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent)" }}>
              {getStatusCount(status)}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
        {missions.length} total missions
      </div>
    </div>
  );
}
