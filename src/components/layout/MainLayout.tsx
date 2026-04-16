import NavigationSidebar from "./NavigationSidebar";
import ScribeLogViewer from "../scribe/ScribeLogViewer";

export default function MainLayout({ 
  children, 
  hideScribe = false 
}: { 
  children: React.ReactNode; 
  hideScribe?: boolean;
}) {
  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "var(--bg)",
      width: "100vw",
      overflow: "hidden"
    }}>
      {/* Navigation Sidebar */}
      <NavigationSidebar />
      
      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease"
      }}>
        <main style={{ 
          flex: 1, 
          padding: "2rem", 
          overflowY: "auto",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          {children}
        </main>
      </div>
      
      {/* Scribe Sidebar - Persistent Right Panel */}
      {!hideScribe && (
        <div style={{ 
          width: "400px", 
          background: "var(--bg2)", 
          borderLeft: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          flexShrink: 0,
        }}>
          <ScribeLogViewer />
        </div>
      )}
    </div>
  );
}
