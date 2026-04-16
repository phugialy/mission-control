#!/usr/bin/env node

// Simple test to see what's being parsed currently
const fs = require('fs');
const path = require('path');

const SCRIBE_BASE = '/home/pilown/workspaces/scribe';

// Simplified version of the parser
function parseExecutionBoardSimple(content) {
  const result = {
    activeMissions: [],
    agentStatus: [],
    parked: [],
    ideas: []
  };

  // Find sections by matching exact patterns in the content 
  const sections = {};
  
  // Split by '##' headers while preserving content
  const parts = content.split(/(?=\n## )/g);
  
  for (let part of parts) {
    if (part.includes("## Active Missions")) {
      sections.activeMissions = part;
    } else if (part.includes("## Agent Status")) {
      sections.agentStatus = part;
    } else if (part.includes("## Parked")) {
      sections.parked = part;
    } else if (part.includes("## Ideas Queue")) {
      sections.ideas = part;
    }
  }
  
  // Extract Active Missions
  if (sections.activeMissions) {
    const lines = sections.activeMissions.split('\n');
    for (let line of lines) {
      if (line.includes('|') && !line.match(/^\|\s*-*\s*-\s*-*\s*\|/) && !line.includes('Mission | Owner | Status')) {
        const cols = line.split('|').map(c => c.trim()).filter(c => c !== '');
        if (cols.length >= 5) {
          result.activeMissions.push({
            mission: cols[0],
            owner: cols[1], 
            status: cols[2],
            lastUpdate: cols[3],
            blockers: cols[4]
          });
        }
      }
    }
  }
  
  // Extract Agent Status
  if (sections.agentStatus) {
    const lines = sections.agentStatus.split('\n');
    for (let line of lines) {
      if (line.includes('|') && !line.includes('Agent | Current Task | Status')) {
        const cols = line.split('|').map(c => c.trim()).filter(c => c !== '');
        if (cols.length >= 4) {
          result.agentStatus.push({
            agent: cols[0],
            currentTask: cols[1],
            status: cols[2],
            lastSignal: cols[3]
          });
        } 
      }
    }
  }
  
  // Extract Parked
  if (sections.parked) {
    const lines = sections.parked.split('\n');
    for (let line of lines) {
      if (line.includes('|') && !line.includes('Item | Waiting For | Since')) {
        const cols = line.split('|').map(c => c.trim()).filter(c => c !== '');
        if (cols.length >= 3) {
          result.parked.push({
            item: cols[0],
            waitingFor: cols[1],
            since: cols[2]
          });
        }
      }
    }
  }
  
  // Extract Ideas
  if (sections.ideas) {
    const match = sections.ideas.match(/(- \[\d{4}-\d{2}-\d{2}\] .+)/g);
    if (match) {
      for (let idea of match) {
        const dateMatch = idea.match(/\[(\d{4}-\d{2}-\d{2})\]/);
        const ideaText = idea.split(']').slice(1).join(']').trim();
        if (dateMatch) {
          result.ideas.push({
            date: dateMatch[1],
            idea: ideaText
          });
        }
      }
    }
  }
  
  return result;
}

try {
  const execBoardPath = path.join(SCRIBE_BASE, 'EXECUTION-BOARD.md');
  if (fs.existsSync(execBoardPath)) {
    const content = fs.readFileSync(execBoardPath, 'utf-8');
    const parsed = parseExecutionBoardSimple(content);
    
    console.log("=== PARSING SIMULATION ===");
    console.log("Active Missions found:", parsed.activeMissions.length);
    parsed.activeMissions.forEach((m, i) => {
      console.log(`  ${i+1}. Mission: "${m.mission}", Owner: "${m.owner}", Status: "${m.status}"`);
    });

    console.log("\\nAgent Status found:", parsed.agentStatus.length);
    parsed.agentStatus.forEach((a, i) => {
      console.log(`  ${i+1}. Agent: "${a.agent}", Task: "${a.currentTask}", Status: "${a.status}"`);
    });

    console.log("\\nParked items found:", parsed.parked.length);
    parsed.parked.forEach((p, i) => {
      console.log(`  ${i+1}. Item: "${p.item}", Waiting For: "${p.waitingFor}", Since: "${p.since}"`);
    });

    console.log("\\nIdeas found:", parsed.ideas.length);
    parsed.ideas.forEach((idea, i) => {
      console.log(`  ${i+1}. Date: ${idea.date}, Idea: ${idea.idea}`);
    });
  } else {
    console.log("Could not find EXECUTION-BOARD.md");
  }
} catch (error) {
  console.error("Error:", error.message);
}