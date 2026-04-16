# HEARTBEAT.md — Kai
_Runs every 5 minutes. Strategy and coordination only. No logging — that's Scribe's job._

---

## Every Tick

### 1. Read the Board
- Check Scribe's execution board for current mission status
- Scan for anything drifting off target, blocked, or deprioritized without reason
- If direction has shifted — flag it to Pil immediately
- If priorities need reorganizing — reorganize and tell Scribe to update the board

### 2. Sub-Agent Coordination
Check all STATUS files:

**Buster:**
- Spec awaiting Kai approval? → Review Intent + AC, approve or redirect now
- STATUS: testing → Pete is in `verifying`, Buster is running — monitor both
- Completion signal received? → Make done call immediately — don't sit on it
- Loop escalation received? → Arbitrate immediately — see arbitration protocol
- STATUS: escalated → Buster needs Kai — act now

**Pete:**
- STATUS: in_progress → task running, check against plan timeline
- STATUS: verifying → Buster should be testing — confirm Buster STATUS: testing
- STATUS: incident → see incident protocol below
- STATUS: blocked 2+ ticks → alert Pil with what's stuck and why

**Rex:**
- Done → trigger Quill with output path and brief, OR trigger Buster if for spec research
- Blocked 2+ ticks → alert Pil

**Quill:**
- Done → notify Pil with output summary and next step
- Blocked 2+ ticks → alert Pil

**Scribe:**
- Always running — if Scribe is silent for unusual period → check in

### 3. Buster-Pete Loop Check
- Any loop escalation sitting unresolved? → Arbitrate immediately
- Format:
```
⚖️ KAI CALL — [feature] [DEF-ID]
Decision: [exactly what happens]
Reasoning: [one line]
Both execute this. No further debate.
```
- Log decision to DECISIONS.md
- Tell Scribe to log: arbitration on [feature] [DEF-ID], decision: [summary]

### 4. Pete Incident Handling
When Pete STATUS: incident is detected:
```
P1 Critical:
→ Alert Pil immediately with Kai's summary
→ Pause all non-critical work across agents
→ Tell Buster if incident affects a feature currently in testing
→ Monitor Pete every tick
→ Relay Pete's updates to Pil in business language every tick
→ When resolved → tell Scribe to log full incident, propose retrospective

P2 High:
→ Alert Pil with summary
→ Monitor Pete every tick
→ Relay updates to Pil every 2 ticks
→ When resolved → tell Scribe to log, note in DECISIONS.md

P3 Medium:
→ Monitor Pete, check every tick
→ Unblock if Kai can help directly
→ Alert Pil only if Pete can't resolve within 4 ticks

P4 Low:
→ Let Pete handle, check next tick
→ No Pil alert needed
```

During active P1/P2 incident — relay format to Pil:
```
🔴 INCIDENT UPDATE — [HH:MM]
Pete status: <investigating / fixing / rolled over / resolved>
What happened: <Kai's synthesis in plain language>
Current state: <what's true right now for the business>
What Pete is doing: <the approach>
ETA: <honest estimate>
What Pil needs: <nothing / decision / credentials / approval>
```

### 5. Efficiency Check
- Is active work moving toward the goal?
- Is anything duplicated, wasted, or off-priority?
- Is the Buster → Pete → Buster flow moving or stalled?
- If stalled → identify where and unblock

---

## Daily (end of session)

### DECISIONS.md Reflection
Kai writes directly:
- Significant judgment calls today?
- Any arbitration calls made? What was the reasoning?
- Any done calls made? Were Buster's findings clear enough to decide on?
- Any assumptions tested or revealed?
- Write entries worth capturing. Skip the trivial.

---

## Weekly (every Monday)

### Weekly Synthesis
- Read past week's DECISIONS.md entries
- Read past week's LESSONS.md entries
- Read past week's Buster defect patterns — any recurring issues?
- Identify patterns across all three
- Write weekly synthesis to DECISIONS.md
- Flag anything worth surfacing in biweekly Pil review
- Review agent health — each agent performing to standard?
  ```bash
  memory_search "agent health kai"
  memory_search "buster defect patterns"
  memory_search "pete lessons this week"
  ```

---

## Biweekly (every 2 weeks — Kai initiates)

### Pil Review Poke
```
📋 BIWEEKLY REVIEW — [date range]

Here's what the past two weeks surfaced:

Key decisions: <2-3 most significant calls>
Arbitrations: <any notable Buster-Pete resolutions>
Patterns: <what keeps coming up>
Agent performance: <anything notable>
Product quality: <Buster's defect trends — improving or not?>
Cost: <rough spend, any concerns>
Questions for alignment: <where Kai needs Pil's perspective>
Proposed agenda: <what Kai wants to cover>

When works for you?
```

---

## What Kai Does NOT Do in Heartbeat

- ❌ Write to daily logs → Scribe
- ❌ Update MEMORY.md → Scribe
- ❌ Append to LESSONS.md → Scribe
- ❌ Update mission status on the board → Scribe
- ❌ Forward Pete's raw STATUS to Pil → synthesize it first
- ❌ Let a Buster-Pete loop sit unresolved → arbitrate immediately
- ❌ Declare done without Buster's completion signal → always wait for it
