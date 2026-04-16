"use client";
import { useState, useEffect } from 'react';
import MainLayout from "@/components/layout/MainLayout";

interface Agent {
  name: string;
  status: 'idle' | 'working' | 'blocked' | 'offline';
  task: string;
  updated: string;
}

export default function Home() { 
  const [agents, setAgents] = useState<Agent[]>([
    { name: 'Pete', status: 'offline', task: 'Loading...', updated: 'N/A' },
    { name: 'Rex', status: 'offline', task: 'Loading...', updated: 'N/A' },
    { name: 'Quill', status: 'offline', task: 'Loading...', updated: 'N/A' },
    { name: 'Buster', status: 'offline', task: 'Loading...', updated: 'N/A' },
    { name: 'Scribe', status: 'offline', task: 'Loading...', updated: 'N/A' }
  ]);
  
  const [commandInput, setCommandInput] = useState('');
  const [commandResponse, setCommandResponse] = useState('');
  
  // Fetch agent statuses
  useEffect(() => {
    const fetchAgentStatuses = async () => {
      try {
        const res = await fetch('/api/agents/status');
        const data = await res.json();
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agent statuses:', error);
      }
    };
    
    // Initial fetch
    fetchAgentStatuses();
    
    // Setup polling
    const intervalId = setInterval(fetchAgentStatuses, 2000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const sendCommand = async () => {
    if (!commandInput.trim()) return;
    
    try {
      const res = await fetch('/api/command/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: commandInput }),
      });
      
      const responseData = await res.json();
      
      if (responseData.success) {
        setCommandResponse('Command sent successfully!');
      } else {
        setCommandResponse('Error: ' + responseData.error);
      }
      
      // Clear the input
      setCommandInput('');
      
      // Clear response message after 3 seconds
      setTimeout(() => setCommandResponse(''), 3000);
    } catch (error) {
      setCommandResponse('Error sending command: ' + error.toString());
    }
  };

  // Get status color based on agent status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working':
        return '#3b82f6'; // blue-500
      case 'idle':
        return '#10b981'; // green-500
      case 'blocked':
        return '#ef4444'; // red-500
      case 'offline':
        return '#6b7280'; // gray-500
      default:
        return '#6b7280'; // gray-500
    }
  };
  
  // Get status display text
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'working':
        return 'WORKING';
      case 'idle':
        return 'IDLE';
      case 'blocked':
        return 'BLOCKED';
      case 'offline':
        return 'OFFLINE';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)', gap: '1rem' }}>
        {/* Left Sidebar: Agent Status Rack - 20% width */}
        <div style={{ 
          width: '20%', 
          minWidth: '250px', 
          background: 'var(--bg2)',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text)' }}>
              Agent Status
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text2)' }}>
              Global heartbeat monitoring
            </p>
          </div>
          
          {/* Command Input */}
          <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <textarea 
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Command to send to Kai..."
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '0.375rem',
                padding: '0.5rem',
                fontSize: '0.875rem',
                minHeight: '60px',
                resize: 'vertical'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  sendCommand();
                  e.preventDefault();
                }
              }}
            />
            <button
              onClick={sendCommand}
              style={{
                background: 'var(--secondary)',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Send Command
            </button>
            {commandResponse && (
              <div style={{
                fontSize: '0.8rem',
                color: commandResponse.startsWith('Error') ? '#ef4444' : '#10b981',
                paddingTop: '0.25rem',
                paddingBottom: '0.5rem'
              }}>
                {commandResponse}
              </div>
            )}
          </div>
          
          {/* Agent Status List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {agents.map((agent, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'var(--bg)',
                  borderRadius: '0.375rem',
                  marginBottom: '0.5rem',
                  border: '1px solid var(--border)'
                }}
              >
                {/* Status Dot */}
                <div
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(agent.status),
                    marginRight: '0.75rem',
                  }}
                ></div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color: 'var(--text)' }}>{agent.name}</strong>
                    <span style={{ fontSize: '0.7rem', color: getStatusColor(agent.status), textTransform: 'uppercase', fontWeight: 'bold' }}>
                      {getStatusDisplay(agent.status)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: '0.25rem' }}>
                    {agent.task}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#888888', marginTop: '0.25rem' }}>
                    Updated: {agent.updated}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Center Panel: Main Content (Kanban/Task Board) - 60% width */}
        <div style={{ 
          width: '60%', 
          overflowY: 'auto',
          padding: '1rem'
        }}>
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
                4
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>
                1 offline
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
        
        {/* Right Sidebar: Live Feed (currently placeholder) - 20% width */}
        <div style={{ 
          width: '20%',
          minWidth: '250px',
          background: 'var(--bg2)',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid var(--border)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text)' }}>
              Live Feed
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text2)' }}>
              Recent system events
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
            <div style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: '#888888' }}>[15:05] Pete:</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: '0.25rem' }}>Agent Status API endpoint implemented</div>
            </div>
            
            <div style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: '#888888' }}>[15:04] Pete:</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: '0.25rem' }}>Command input added to dashboard</div>
            </div>
            
            <div style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: '#888888' }}>[15:03] Kai:</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: '0.25rem' }}>Ready for UI Phase 2 implementation</div>
            </div>
            
            <div style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: '#888888' }}>[15:02] Buster:</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: '0.25rem' }}>Spec for UI Phase 2 approved</div>
            </div>
            
            <div style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: '#888888' }}>[15:01] Scribe:</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: '0.25rem' }}>Documentation updated</div>
            </div>
            
            <div style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: '#888888' }}>[15:00] Rex:</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text)', marginTop: '0.25rem' }}>Research completed</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}