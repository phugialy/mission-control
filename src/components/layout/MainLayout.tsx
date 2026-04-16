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
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Navigation Sidebar */}
      <NavigationSidebar />
      
      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column",
        maxWidth: hideScribe ? "calc(100vw - 240px)" : "calc(100vw - 640px)" 
      }}>
        <main style={{ flex: 1, padding: "1.5rem", overflow: "auto" }}>
          {children}
        </main>
      </div>
      
      {/* Scribe Sidebar - only show if not hidden */}
      {!hideScribe && (
        <div style={{ 
          width: "400px", 
          background: "var(--bg2)", 
          borderLeft: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "sticky",
          top: 0
        }}>
          <ScribeLogViewer />
        </div>
      )}
    </div>
  );
}