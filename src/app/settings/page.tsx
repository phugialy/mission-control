import MainLayout from "@/components/layout/MainLayout";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div>
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: "bold", color: "var(--text)" }}>
            System Settings
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "1rem", color: "var(--text2)" }}>
            Configure your Mission Control environment and preferences
          </p>
        </header>

        <div style={{ maxWidth: "800px" }}>
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ 
              fontSize: "1.25rem", 
              fontWeight: "600", 
              color: "var(--text)",
              marginBottom: "1rem"
            }}>
              User Preferences
            </h2>
            
            <div style={{ 
              background: "var(--bg2)", 
              borderRadius: "0.5rem", 
              padding: "1rem",
              border: "1px solid var(--border)"
            }}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>
                  Theme
                </label>
                <select style={{ 
                  width: "100%", 
                  padding: "0.5rem", 
                  background: "var(--bg)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "0.25rem", 
                  color: "var(--text)" 
                }}>
                  <option value="dark">Dark Command Center</option>
                  <option value="light">Light Mode</option>
                  <option value="auto">Auto (System Default)</option>
                </select>
              </div>
              
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "0.5rem", 
                  color: "var(--text)" 
                }}>
                  Notification Frequency
                </label>
                <select style={{ 
                  width: "100%", 
                  padding: "0.5rem", 
                  background: "var(--bg)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "0.25rem", 
                  color: "var(--text)" 
                }}>
                  <option value="real-time">Real-time (every update)</option>
                  <option value="summary-hourly">Hourly Summary</option>
                  <option value="summary-daily">Daily Summary</option>
                  <option value="digest">Digest Mode (weekly)</option>
                </select>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ 
              fontSize: "1.25rem", 
              fontWeight: "600", 
              color: "var(--text)",
              marginBottom: "1rem"
            }}>
              System Configuration
            </h2>
            
            <div style={{ 
              background: "var(--bg2)", 
              borderRadius: "0.5rem", 
              padding: "1rem",
              border: "1px solid var(--border)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: "500" }}>
                    Auto-refresh Scribe Board
                  </div>
                  <div style={{ color: "var(--text2)", fontSize: "0.875rem" }}>
                    Automatically refresh the execution board every minute
                  </div>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "var(--accent)",
                    transition: "0.2s",
                    borderRadius: "24px"
                  }}></span>
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "4px",
                    left: "4px",
                    width: "16px",
                    height: "16px",
                    background: "white",
                    transition: "0.2s",
                    borderRadius: "50%"
                  }}></span>
                </label>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: "500" }}>
                    Enable Detailed Activity Tracking
                  </div>
                  <div style={{ color: "var(--text2)", fontSize: "0.875rem" }}>
                    Capture more granular activity logs for analysis
                  </div>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
                  <input
                    type="checkbox"
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "var(--bg)",
                    transition: "0.2s",
                    borderRadius: "24px"
                  }}></span>
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "4px",
                    left: "26px",
                    width: "16px",
                    height: "16px",
                    background: "white",
                    transition: "0.2s",
                    borderRadius: "50%"
                  }}></span>
                </label>
              </div>
            </div>
          </section>

          <section>
            <button style={{
              background: "var(--accent)",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "500"
            }}>
              Save Settings
            </button>
            
            <button style={{
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              marginLeft: "0.5rem",
              cursor: "pointer"
            }}>
              Reset to Defaults
            </button>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}