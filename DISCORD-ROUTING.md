# Discord Agent Communication Guide

## Quick Reference

### How to Reach Each Agent

| Method | Who Responds |
|--------|--------------|
| DM to agent account | That specific agent |
| `research: <msg>` | soccer-research (spawned by me) |
| `writer: <msg>` | soccer-writer (spawned by me) |
| Normal message | mission-control (me) — I'll help or route |

---

## Agent Accounts (Current Setup)

- **soccer-research**: Handles research tasks
- **soccer-writer**: Handles writing/content tasks
- **mission-control**: General coordination, spawns other agents

---

## Communication Options

### Option 1: Direct Message (Fastest)
Message the specific agent's Discord account directly. They respond immediately without routing.

### Option 2: Prefix Routing (in any channel)
Use prefixes to have me route your message:

```
research: find latest news on Champions League final
writer: write a summary of the research findings
```

I'll spawn the agent and return their response.

### Option 3: Just Talk to Me
Normal messages come to me. I'll:
- Answer directly if I can
- Spawn the right agent if needed
- Coordinate between agents for complex tasks

---

## Examples

**Direct:** You → DM to soccer-research → Direct response

**Prefix:**
> You: "research: what's the weather in Chicago?"
> Me → spawns soccer-research → returns result

**Natural:**
> You: "Can you research the World Cup and write about it?"
> Me → spawns soccer-research → gets info → spawns soccer-writer → delivers final

---

## Tips

- Use prefixes when you know which agent you need
- Just describe what you want — I'll figure out who to involve
- Complex multi-step tasks: just tell me the end goal
- All agents can access their workspace files when spawned
