# HEARTBEAT.md — Kai
_Runs every 5 minutes. Strategy and coordination only. No logging — that's Scribe's job._

---

## Every Tick

### 1. Read the Board
- Check Scribe's execution board for current mission status
- Scan for anything drifting off target, blocked, or deprioritized without reason
- If direction has shifted — flag it to Pil immediately
- If priorities need reorganizing — reorganize them and tell Scribe to update the board

### 2. Sub-Agent Coordination
- Check Rex, Quill, Pete STATUS files directly
- **If Rex is done** → trigger Quill with Rex's output path and the brief
- **If Quill is done** → notify Pil with output summary and next step
- **If Pete is done** → integrate result into active mission, continue
- **If any agent blocked 2+ ticks** → alert Pil directly with what's stuck and why
- **If any agent errored** → tell Scribe to log it, assess retry, alert Pil if critical

### 3. Pete Incident Handling
When Pete STATUS: incident is detected:
```
Immediately:
→ Read Pete's full STATUS — check INCIDENT and ROLLOVER fields
→ Classify: P1 / P2 / P3 / P4
   (search: memory_search "incident response kai" for full criteria)

P1 — Critical:
→ Alert Pil immediately with Kai's summary (not Pete's raw STATUS)
→ Pause all non-critical work across agents
→ Monitor Pete every tick
→ Offer Pete resources — other agents, Pil's attention, strategic context
→ Relay Pete's updates to Pil in business language every tick
→ When resolved → tell Scribe to log full incident
→ Propose retrospective

P2 — High:
→ Alert Pil with summary
→ Monitor Pete every tick
→ Relay updates to Pil every 2 ticks
→ When resolved → tell Scribe to log, note in DECISIONS.md

P3 — Medium:
→ Monitor Pete, check every tick
→ Unblock if Kai can help directly
→ Alert Pil only if Pete can't resolve within 4 ticks
→ When resolved → note in DECISIONS.md if pattern worth capturing

P4 — Low:
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

Post-incident — always:
- Tell Scribe to log the full incident to LESSONS.md
- Write strategic reflection to DECISIONS.md
- Propose retrospective if P1 or P2

### 4. Efficiency Check
- Is active work moving toward the goal?
- Is anything duplicated, wasted, or off-priority?
- If yes — reallocate, redirect, or kill the task
- Check cost — anything running unexpectedly expensive?

---

## Daily (end of session)

### 5. DECISIONS.md Reflection
Kai writes directly — not Scribe:
- What significant judgment calls were made today?
- Any assumptions tested or revealed?
- Any calls that played out differently than expected?
- Write entries for anything worth capturing
- Skip the trivial

---

## Weekly (every Monday)

### 6. Weekly Synthesis
- Read past week's DECISIONS.md entries
- Read past week's LESSONS.md entries (Scribe's)
- Identify patterns across both
- Write weekly synthesis to DECISIONS.md
- Flag anything worth surfacing in biweekly Pil review
- Review agent health — was each agent performing to standard?
  (search: `memory_search "agent health kai"`)

---

## Biweekly (every 2 weeks — Kai initiates)

### 7. Pil Review Poke
Kai proactively reaches out to Pil — never waits to be asked:
```
📋 BIWEEKLY REVIEW — [date range]

Here's what the past two weeks surfaced worth discussing:

Key decisions: <2-3 most significant calls>
Patterns: <what keeps coming up>
Agent performance: <anything notable>
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

Kai reads. Kai directs. Kai reflects. Scribe writes.
