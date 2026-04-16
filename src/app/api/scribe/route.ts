import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SCRIBE_BASE = "/home/pilown/workspaces/scribe";

interface ScribeData {
  executionBoard: {
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
  };
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

function parseExecutionBoard(content: string): ScribeData["executionBoard"] {
  const result = {
    activeMissions: [] as ScribeData["executionBoard"]["activeMissions"],
    agentStatus: [] as ScribeData["executionBoard"]["agentStatus"],
    parked: [] as ScribeData["executionBoard"]["parked"],
    ideas: [] as ScribeData["executionBoard"]["ideas"],
  };

  // Helper to extract table rows between headings
  const extractTable = (text: string, startPattern: string): string[] => {
    const regex = new RegExp(startPattern + "\\n([\\s\\S]*?)(?:\\n##|\\n---|\\n\\n|$)");
    const match = text.match(regex);
    if (!match) return [];
    const section = match[1];
    // Extract only actual data rows (skip header and separator)
    return section.split("\n")
      .filter(l => l.includes("|") && !l.match(/^\|\s*[-]+\s*\|/) && !l.match(/^\|\s*\w+.*\w+\s*\|$/))
      .map(l => l.trim());
  };

  // Parse Active Missions
  const missionLines = extractTable(content, "## Active Missions");
  for (const line of missionLines) {
    const match = line.match(/\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/);
    if (match) {
      result.activeMissions.push({
        mission: match[1].trim(),
        owner: match[2].trim(),
        status: match[3].trim(),
        lastUpdate: match[4].trim(),
        blockers: match[5].trim(),
      });
    }
  }

  // Parse Agent Status
  const agentLines = extractTable(content, "## Agent Status");
  for (const line of agentLines) {
    const match = line.match(/\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/);
    if (match) {
      result.agentStatus.push({
        agent: match[1].trim(),
        currentTask: match[2].trim(),
        status: match[3].trim(),
        lastSignal: match[4].trim(),
      });
    }
  }

  // Parse Parked
  const parkedLines = extractTable(content, "## Parked");
  for (const line of parkedLines) {
    const match = line.match(/\|([^|]+)\|([^|]+)\|([^|]+)\|/);
    if (match && match[1].trim() && match[1].trim() !== "—") {
      result.parked.push({
        item: match[1].trim(),
        waitingFor: match[2].trim(),
        since: match[3].trim(),
      });
    }
  }

  // Parse Ideas Queue
  const ideasSection = content.match(/## Ideas Queue\n([\s\S]*?)(?:\n##|\n---|\\n\\n|$)/);
  if (ideasSection) {
    const lines = ideasSection[1].trim().split("\n");
    for (const line of lines) {
      const match = line.match(/- \[(\d{4}-\d{2}-\d{2})\] (.*)/);
      if (match) {
        result.ideas.push({
          date: match[1],
          idea: match[2].trim(),
        });
      }
    }
  }

  return result;
}

function parseMemory(content: string): ScribeData["memory"] {
  const dateMatch = content.match(/## (\d{4}-\d{2}-\d{2})/);
  const lines = content.split("\n");
  const entries: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("##")) {
      entries.push(trimmed);
    }
  }
  
  return {
    date: dateMatch ? dateMatch[1] : "Unknown",
    entries,
  };
}

function parseDailyLog(content: string): ScribeData["dailyLogs"] {
  const logs: ScribeData["dailyLogs"] = [];
  const sections = content.split(/^## (\d{4}-\d{2}-\d{2})/m);
  
  for (let i = 1; i < sections.length; i += 2) {
    const date = sections[i];
    const body = sections[i + 1] || "";
    
    const requests: string[] = [];
    const workDone: string[] = [];
    const blockers: string[] = [];
    const ideas: string[] = [];
    
    const reqMatch = body.match(/## Requests\n((?:-.*\n)+)/);
    if (reqMatch) {
      requests.push(...reqMatch[1].trim().split("\n").map(l => l.replace(/^- \[/, "").replace(/\]$/, "").trim()));
    }
    
    const workMatch = body.match(/## Work Done\n((?:-.*\n)+)/);
    if (workMatch) {
      workDone.push(...workMatch[1].trim().split("\n").map(l => l.replace(/^- \[.*\] /, "").trim()));
    }
    
    const blockerMatch = body.match(/## Blockers\n((?:.*\n)*)/);
    if (blockerMatch) {
      const blockerLines = blockerMatch[1].trim().split("\n").filter(l => l.trim() && !l.startsWith("##"));
      blockers.push(...blockerLines.map(l => l.replace(/^- /, "").trim()));
    }
    
    const ideasMatch = body.match(/## Ideas\n((?:-.*\n)+)/);
    if (ideasMatch) {
      ideas.push(...ideasMatch[1].trim().split("\n").map(l => l.replace(/^- /, "").trim()));
    }
    
    logs.push({ date, requests, workDone, blockers, ideas });
  }
  
  return logs;
}

export async function GET() {
  try {
    const data: ScribeData = {
      lastUpdated: "",
      executionBoard: {
        activeMissions: [],
        agentStatus: [],
        parked: [],
        ideas: [],
      },
      memory: { date: "", entries: [] },
      dailyLogs: [],
    };

    // Read EXECUTION-BOARD.md
    const execBoardPath = path.join(SCRIBE_BASE, "EXECUTION-BOARD.md");
    if (fs.existsSync(execBoardPath)) {
      const content = fs.readFileSync(execBoardPath, "utf-8");
      data.executionBoard = parseExecutionBoard(content);
    }

    // Read MEMORY.md
    const memoryPath = path.join(SCRIBE_BASE, "MEMORY.md");
    if (fs.existsSync(memoryPath)) {
      const content = fs.readFileSync(memoryPath, "utf-8");
      data.memory = parseMemory(content);
    }

    // Read daily logs
    const memoryDir = path.join(SCRIBE_BASE, "memory");
    if (fs.existsSync(memoryDir)) {
      const files = fs.readdirSync(memoryDir).filter(f => f.endsWith(".md") && !f.includes("Zone.Identifier"));
      for (const file of files) {
        const filePath = path.join(memoryDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const logs = parseDailyLog(content);
        data.dailyLogs.push(...logs);
      }
      // Sort by date descending
      data.dailyLogs.sort((a, b) => b.date.localeCompare(a.date));
    }

    data.lastUpdated = new Date().toISOString();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading Scribe data:", error);
    return NextResponse.json({ error: "Failed to read Scribe data" }, { status: 500 });
  }
}