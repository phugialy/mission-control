"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/missions", label: "Missions", icon: "📋" },
  { href: "/agents", label: "Agents", icon: "🤖" },
  { href: "/ideas", label: "Ideas", icon: "💡" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function NavigationSidebar() {
  const pathname = usePathname();

  return (
    <div 
      style={{ 
        width: "240px", 
        background: "var(--bg2)", 
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Logo/Header */}
      <div style={{ padding: "1.5rem 1rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ fontSize: "1.25rem" }}>🚀</div>
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold", color: "var(--pilo)" }}>
            Mission Control
          </h1>
        </div>
        <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: "var(--text2)" }}>
            AI Agent Orchestration Suite
          </p>
      </div>

      {/* Navigation Menu */}
      <nav style={{ padding: "1rem 0", flex: 1 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }} className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  textDecoration: "none",
                  color: pathname === item.href ? "var(--accent)" : "var(--text)",
                  backgroundColor: pathname === item.href ? "var(--bg)" : "transparent",
                  borderRadius: "0.375rem",
                  margin: "0 0.5rem",
                  transition: "all 0.2s ease",
                }}
                className="hover:bg-[var(--bg)]"
              >
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                <span style={{ fontWeight: pathname === item.href ? "500" : "400" }}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer/User Info */}
      <div style={{ padding: "1rem", borderTop: "1px solid var(--border)" }}>
        {/* Could add user info or other contextual items here */}
      </div>
    </div>
  );
}