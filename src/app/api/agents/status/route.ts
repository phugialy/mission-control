import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface AgentStatus {
  name: string;
  status: 'idle' | 'working' | 'blocked' | 'offline';
  task: string;
  updated: string;
}

export async function GET(request: NextRequest) {
  // Define agent paths
  const agentPaths = {
    'Pete': '/home/pilown/workspaces/pete/STATUS',
    'Rex': '/home/pilown/workspaces/rex/STATUS',
    'Quill': '/home/pilown/workspaces/quill/STATUS',
    'Buster': '/home/pilown/workspaces/buster/STATUS',
    'Scribe': '/home/pilown/workspaces/scribe/STATUS',
  };

  const statuses: AgentStatus[] = [];

  for (const [name, filePath] of Object.entries(agentPaths)) {
    try {
      // Read the STATUS file
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Parse status from the content
      let status = 'unknown';
      let task = 'N/A';
      let updated = 'N/A';
      
      // Extract status, task, and updated from the file content
      const statusMatch = content.match(/STATUS:\s*(\w+)/i);
      const taskMatch = content.match(/TASK:\s*(.+)/i);
      const updatedMatch = content.match(/UPDATED:\s*(.+)/i);
      
      if (statusMatch) {
        const rawStatus = statusMatch[1].toLowerCase();
        // Map various status formats to the standard ones
        if (rawStatus.includes('idle')) {
          status = 'idle';
        } else if (rawStatus.includes('working') || rawStatus.includes('in__progress') || rawStatus.includes('active') || rawStatus.includes('verifying') || rawStatus.includes('done')) {
          status = 'working';
        } else if (rawStatus.includes('blocked')) {
          status = 'blocked';
        } else {
          status = rawStatus;
        }
      } else {
        status = 'offline'; // If STATUS line not found, assume offline
      }
      
      if (taskMatch) {
        task = taskMatch[1].trim() !== 'none' ? taskMatch[1].trim() : 'No active task';
      }
      
      if (updatedMatch) {
        updated = updatedMatch[1].trim();
      }
      
      statuses.push({
        name,
        status: status as AgentStatus['status'],
        task,
        updated,
      });
    } catch (error) {
      // If file doesn't exist or error occurs, mark as offline
      statuses.push({
        name,
        status: 'offline',
        task: 'File not accessible',
        updated: 'N/A',
      });
    }
  }

  return Response.json(statuses);
}