# World of Workcraft Implementation Guide

*How the game world exists in co-op.us/app — mapping design to features, progress, and roadmap*

---

## Overview

World of Workcraft is not a separate system. It is **co-op.us re-framed as a game**. Every feature, navigation path, and unlock mechanic in co-op.us is part of the same world. This document defines how the game world manifests in the tool, starting with what exists today and extending to the roadmap.

---

## The Seven Layers → Navigation & Features

Each layer (e/H-LAM/T/S) maps to a URL section in co-op.us/app. They reveal progressively as you earn reputation and make contributions.

### e/ Ecology
**URL:** `/ecology`  
**Status:** ✅ Live  
**What it is:** Watershed data, geographic grounding, seasonal rhythms specific to the hub.

**In the tool:**
- Hub-specific context (location, timezone, bioregion)
- Seasonal/moon cycle visibility (coordination rhythms)
- e/ Dimension unlocks after first contribution (visible in `/d/ecology`)
- Part of `/about` under "The World" section

**Roadmap:** Advanced ecology dashboard (A04 — Network Health Metrics) showing watershed health, regenerative indicators.

---

### H/ Human
**URL:** `/` (Explore), `/p/:id` (Profile), `/member-directory`  
**Status:** ✅ Live  
**What it is:** Member profiles, craft selection, reputation, presence.

**In the tool:**
- Guestname enrollment (`/enroll`)
- Craft selection (`/voice` or inline at arrival)
- Public member profiles (`/p/:id`)
- Member directory with craft filtering (roadmap: B03)
- Rarity progression: Common → Uncommon → Rare → Epic → Legendary (visible on profile)
- Agent identity layer (B01-B07 roadmap: agent registry, reputation system)

**Live features:**
- Profile view: guestname, craft, rarity level, recent contributions, Cloud balance
- Member search and discovery

**Roadmap:**
- Agent leaderboard (B03) — ranked by reputation
- Agent-to-human channels (B04)
- Agent-to-agent coordination (B05)
- Federated identity (F02) — guestname portable across hubs

---

### L/ Language
**URL:** `/` (Explore), `/p/:id` (vocabulary in public profiles), `Guild of the Quill channel`  
**Status:** ✅ Partial  
**What it is:** Shared naming, vocabulary, glossary, how things are called.

**In the tool:**
- Craft names and definitions (8 primary crafts, 8 guilds)
- Archetype naming (Code × Earth = "Terraformer", etc.)
- Dimension naming and symbols (e/, H/, L/, A/, M/, T/, S/)
- Contribution categories/titles (how work is named)
- Terminology visible in About section

**Live features:**
- Craft definitions in Arrival flow and profiles
- Guild membership and guild channels (`/channels`)

**Roadmap:**
- Glossary page (L01 — lived vocabulary with history)
- Guild terminology board (where members propose/define craft-specific terms)
- Cross-hub language sync (federation feature)

---

### A/ Artifacts
**URL:** `/artifacts`, `/artifact/:id`, `/chain`  
**Status:** ✅ Live  
**What it is:** Durable work — projects, documents, tools, ventures, contributions.

**In the tool:**
- Contributions recorded on chain (`/chain` — Chain Explorer)
- Artifact detail pages (`/artifact/:id`)
- Artifacts gallery (`/artifacts`)
- Ventures and portfolios (`/ventures` roadmap V01)
- Batch sealing (immutable record of work)

**Live features:**
- Contribution submission (`/contribute`)
- Contribution detail view with chain history
- Chain explorer showing all events
- Replication across hubs (each hub's local chain)

**Roadmap:**
- Venture portfolio (V01) — all ventures with status, team, revenue
- Public venture portfolio (V06) — opt-in visibility
- Artifact provenance (A02 — audit trail for any entity)
- Export engine (A03 — CSV/JSON of contributions, artifacts)

---

### M/ Methodology
**URL:** `/governance`, `/methodology`, `Forest Council channels`  
**Status:** ✅ Partial (local), 🚧 Roadmap (federation)  
**What it is:** Governance protocols, decision flows, coordination patterns.

**In the tool:**
- Hub governance structure (visible in `/about/governance`)
- Patronage formula visibility (P01 roadmap — capital account dashboard)
- Voting on proposals (roadmap: P03 — allocation periods with approval)
- Forest Council decision channels (federation feature, roadmap)

**Live features:**
- About page explaining governance principles
- Channels for governance discussion (`/channels`)

**Roadmap:**
- Patronage formula engine (P02) — configurable weights
- Allocation cycles (P03) — annual/quarterly approvals
- Proposal voting (Vote feature in chain)
- Forest Council channels (federation communication layer)

---

### T/ Training
**URL:** `/training`, `/learning-paths`  
**Status:** ✅ Partial  
**What it is:** Learning, capability building, knowledge commons.

**In the tool:**
- Training dimension (`/d/training`)
- Education hub (`/education-hub` roadmap E01)
- Guild-specific mentorship (guild channels, craft specialization tracking)
- Dimension progression as learning arc (each dimension reveals new capability)

**Live features:**
- Training dimension unlocked after second/third contribution
- Dimension-specific resources and context

**Roadmap:**
- Education hub (E01) — structured learning paths for patronage, governance, Cloud
- Learning paths (E02) — choose your journey
- Specialization mentoring (guild chambers coordinate skill development)
- Craft evolution tracker (showing past archetypes/specializations)

---

### S/ Sessions
**URL:** `/sessions` (roadmap), `#gathering` channels, calendar integration  
**Status:** 🚧 Roadmap  
**What it is:** Convergences, gatherings, in-person and virtual sessions.

**In the tool:**
- Sessions dimension (`/d/sessions`)
- Event channels (`#upcoming-gatherings`, `#convergence-prep`, `#event-notes`)
- Session-based contribution recording (attend a meeting = contribution with session reference)

**Live features:**
- Channels for session coordination
- Session-referenced contributions on chain

**Roadmap:**
- Sessions page (`/sessions` roadmap S01)
- Session creation and calendar
- Attendance verification on chain
- Session recordings and notes archive
- Cross-hub convergence coordination (federation sessions)

---

## Progression & Unlock Mechanics

### The Enrollment Journey
**URL:** `/enroll` → `/arrive` → `/voice`  
**Status:** ✅ Live

**What happens:**
1. Choose guestname (hospitality protocol)
2. Enter cooperative (verify email)
3. See H/ Human layer (people, profiles)
4. Make first contribution (creates chain entry)
5. L/ Language and A/ Artifacts appear
6. Choose primary & secondary crafts (at `/voice` or inline)
7. Archetype assigned (Terraformer, Poet, Navigator, etc.)

### Dimension Unlock Sequence
**Status:** ✅ Live

Dimensions unlock progressively as you contribute and engage:
- **Arrival:** H/ (Human) visible
- **After 1st contribution:** L/ (Language) and A/ (Artifacts)
- **After 3rd contribution:** e/ (Ecology) and M/ (Methodology)
- **After deeper engagement:** T/ (Training) and S/ (Sessions)

Each dimension has:
- Color-coded icon and symbol
- Dimension view (`/d/:dimension`)
- Dimension leaderboard (discovery mode, `/dimensions/discovery`)
- Unlock animations and notifications

### Rarity Progression
**Status:** ✅ Live

- **Common** — Guestname chosen
- **Uncommon** — 5+ contributions
- **Rare** — 20+ contributions + specialization unlocked
- **Epic** — 50+ contributions + high Cloud balance
- **Legendary** — 100+ contributions + guild leadership

Visible on profile, affects governance weight (roadmap).

### Craft Specialization
**Status:** 🚧 Roadmap

After 20 contributions in an archetype:
- Unlock specialization selection (once per season/3 months)
- Choose 1 of 6 specialization paths
- Craft journey becomes visible (past archetypes + current specialization)

**Example:** Terraformer (Code × Earth) can specialize into:
1. Seedkeeper — Regenerative design
2. Mycologist — Hidden networks
3. Beekeeper — Living systems
4. Restorer — Repair & recovery
5. Engineer — Raw capability
6. Terraformer (pure) — Landscape shaping

---

## The Economy: $CLOUD

### Cloud Overview
**URL:** `/cloud` (about page section), `/wallet` (balance), `/cloud-marketplace` (roadmap)  
**Status:** ✅ Partial (earning and tracking), 🚧 (marketplace)

### Earning Cloud
**Live mechanisms:**
- Contributions recorded with Cloud value
- Patronage calculations distribute Cloud (`/patronage-review` roadmap)
- Cloud awarded per contribution type (pending P02 roadmap)
- Visible on profile as balance

### Spending Cloud
**Roadmap:**
- Cloud marketplace (C01) — services, compute, storage, priority
- Cloud transfer (C02) — peer recognition
- Cloud history (C04) — detailed transaction log

### Cloud → Patronage Bridge
**Status:** 🚧 Roadmap (C06)

Cloud earned during the moon cycle contributes to patronage weight at allocation time. High Cloud activity = higher patronage weight when allocations are calculated.

---

## Patronage Accounting

### What Exists
**Status:** 🚧 Roadmap (P01-P06)

### What's Coming
- **P01:** Capital account dashboard — member view of balance, credits, debits, history
- **P02:** Patronage formula engine — configurable weights (labor, capital, community, etc.)
- **P03:** Allocation periods — annual/quarterly cycles with preview and approval
- **P04:** Distribution mechanics — cash vs. written notice, tax forms
- **P05:** Patronage reporting — cooperative-wide view for stewards
- **P06:** Historical patronage explorer — how did my allocation change?

### Why It Matters for the Game
Patronage is the economic heart. It's how contributions (your craft) convert to economic power. The game's progression toward "economically just" requires transparent patronage.

---

## Ventures & Royalties

### What Exists
**Status:** 🚧 Roadmap (V01-V06)

### What's Coming
- **V01:** Venture portfolio — status, team, revenue, agreements
- **V02:** Royalty agreement builder — shares, vesting, dilution
- **V03:** Member royalties dashboard — vested/unvested shares
- **V04:** Venture creation — propose, attach team, set terms
- **V05:** Revenue recording — log events, trigger calculations
- **V06:** Public venture portfolio — opt-in visibility

### In the Game
Ventures are cross-hub expeditions. A venture like "Pollination Network" spans multiple hubs, involves multiple crafts, and shares royalties transparently.

---

## Communication & Collaboration

### Local Channels (Within Hub)
**URL:** `/channels`, `/channels/:slug`  
**Status:** ✅ Live

**Structure:**
- `#introduction` — H/ layer
- `#ecology`, `#watershed` — e/ layer
- `#projects`, `#artifacts` — A/ layer
- `#methodology`, `#governance` — M/ layer
- `#training`, `#learning-circles` — T/ layer
- `#gatherings`, `#convergence` — S/ layer
- `#guild-*` — craft-specific channels (Guild of the Loom, etc.)

**Features:**
- Threaded discussion
- Asynchronous-first
- Contribution references (link to chain entries)
- Permission-based (members only by default)

### Guild Chambers (Global Craft Communities)
**URL:** Roadmap federation feature  
**Status:** 🚧 Planned

- `Guild of the Loom` (Code practitioners across all hubs)
- `Guild of the Quill` (Word practitioners)
- `Guild of the Root` (Earth practitioners)
- *...and five more*

Channels would include:
- `#infrastructure-standards`
- `#craft-innovation`
- `#specialization-mentoring`
- `#ecosystem-security`
- `#guild-convergence`

### Inter-Hub Bridges
**URL:** Roadmap federation feature  
**Status:** 🚧 Planned

When two hubs coordinate on a venture (like Techne ↔ Nairobi for Pollination Network), they create a bridge:
- Bilateral channels
- Shared venture spaces
- Cost/revenue split tracking
- Bridge steward role

### Forest Council
**URL:** Roadmap federation  
**Status:** 🚧 Planned

Federation-level coordination:
- Patronage & allocation committee
- Chain & cryptography committee
- Federation economics committee
- Conflict resolution

---

## The Chain: Immutable Record

**URL:** `/chain`  
**Status:** ✅ Live

Every action is recorded on the append-only chain:
- Contribution submissions
- Patronage allocations
- Votes and decisions
- Chain batches sealed each moon cycle (sunrise/sunset Boulder time)
- Merkle verification for integrity

**Game significance:** The chain is the "evidence" of your craft. It's unhackable, permanent, and publicly verifiable.

---

## Navigation as Game Design

### The Main Menu (Desktop Nav)
**Status:** ✅ Live

Fixed navigation shows:
- `/explore` — discover people and projects
- `/dimensions` — the seven layers revealed progressively
- `/artifacts` — see what's been built
- `/channels` — community conversation
- `/wallet` — your Cloud balance
- `/profile` — your guestname and craft

Dimensions appear/disappear based on unlock state.

### Mobile Navigation
**Status:** ✅ Live

Drawer-based, same dimensions revealed progressively.

### About Section
**URL:** `/about`  
**Status:** ✅ Live

Museum-like exhibition:
- The World
- Guestname (protocol)
- Crafts (the eight and 64 archetypes)
- Dimensions (the seven layers)
- Cloud (economy)
- The Tree (chain, events, batches)
- Signals (how to get notified)
- Solar Cycles (moon cycles, batch rhythm)
- Hubs (federation model)
- Enter (enroll, sign up)

Plus sub-pages:
- `/about/governance` — how decisions happen
- `/about/identity` — humans and agents together
- `/about/education` — learning structure
- `/about/economics` — patronage and Cloud
- `/about/transparency` — audit trails
- `/about/channels` — communication
- `/about/federation` — hub network model
- `/about/world-of-workcraft` — **this game design** ✨

---

## Roadmap Integration

The `/progress` page shows **three categories:**

### 1. Live Evolutions (Completed)
What's working now:
- E01-E05: Arrival, dimensions, guestname, crafts, basic contributions
- Core chain infrastructure
- Local channels
- Basic patronage tracking

### 2. In-Progress (Current Sprint Series)
Features being built now (check `/progress` for current status):
- Analytics & transparency (A01-A05)
- Advanced chain features
- Hub infrastructure improvements

### 3. Future Roadmap

**Phase 1: Economic Justice (P01-P06)**
- Patronage accounting fully transparent
- Capital account dashboards
- Allocation cycle management

**Phase 2: Ventures & Scaling (V01-V06)**
- Venture portfolio and royalties
- Cross-venture contribution tracking
- Revenue sharing

**Phase 3: Cloud Marketplace (C01-C06)**
- Cloud spending on services
- Dynamic pricing engine
- Cloud → patronage bridge

**Phase 4: Federation (Federation features)**
- Guild chambers (global craft coordination)
- Inter-hub bridges (bilateral ventures)
- Forest Council (ecosystem governance)
- Digital Infrastructure Trust (cooperative data infrastructure)

**Phase 5: Advanced Features (B01-B07, E01-E02, S01+)**
- Agent identity and reputation system
- Education hub and learning paths
- Sessions and convergence tracking

---

## Game Flow: A Player's Journey

### Day 1: Arrival
1. Go to `/enroll` — choose guestname
2. See `/arrive` — enter the cooperative
3. You see **H/ Human** — people profiles, crafts, members
4. You select craft at `/voice` — primary & secondary
5. You become a **Terraformer** (or your archetype)
6. **Unlock:** L/ Language, A/ Artifacts appear

### Week 1: Contribution
1. Make your first contribution (`/contribute`)
2. Submit to chain — it becomes immutable
3. **Unlock:** e/ Ecology, M/ Methodology visible
4. Explore `/ecology` — see watershed context
5. Visit `/methodology` — understand how hub governs
6. Check `/cloud` balance — you earned something!

### Month 1: Specialization Path
1. After 20 contributions, specialization unlocks
2. Visit `/voice` to choose path (Seedkeeper, Mycologist, Beekeeper, etc.)
3. Your craft journey becomes public
4. You're invited to **Guild of the Root** (Earth practitioners)
5. Join guild channels — connect with practitioners globally (future)

### Moon Cycle: Patronage
1. At allocation time, `/patronage-review` shows your calculation
2. See labor%, capital%, community%, rarity%
3. Watch as contributions convert to economic power
4. Cloud earned during moon cycle contributes to allocation weight

### Ongoing: Ventures & Collaboration
1. Join cross-hub venture (Pollination Network)
2. Collaborate across hubs via bridge channels
3. Contribute to venture-specific artifacts
4. At venture revenue time, earn royalties (future)
5. Reputation grows globally

### Long-term: Stewardship
1. High rarity, many contributions, strong reputation
2. Invited to governance roles (forest council, bridge steward, guild chair)
3. Your craft has shaped the ecosystem
4. New players see your contributions as anchors
5. The forest grows together

---

## What's Missing (and Why)

Some World of Workcraft features don't exist in co-op.us/app yet:

### Not Yet Implemented
- ❌ Specializations (archive of past archetypes)
- ❌ Guild chambers (global craft coordination)
- ❌ Inter-hub bridges (federation coordination channels)
- ❌ Forest Council (ecosystem governance)
- ❌ Digital Infrastructure Trust (cooperative data infrastructure)
- ❌ Venture royalties (V01-V06)
- ❌ Advanced patronage accounting (P02-P06)
- ❌ Cloud marketplace (C01-C06)

### Why?
Federation is **complex**. It requires:
- Multi-hub data replication
- Cross-hub identity portability
- Bilateral trust agreements
- Governance layer above single-hub

**The roadmap gets us there.** Phase 4-5 includes all federation features.

### Building toward Federation
Each phase builds on the previous:
1. ✅ **Local mastery** (single hub, all seven layers)
2. 🚧 **Economic transparency** (patronage and Cloud clear)
3. 🚧 **Venture capability** (multi-team projects)
4. 🚧 **Scalable infrastructure** (cloud marketplace, data trust)
5. 🚧 **Federation** (guild chambers, bridges, councils)

---

## How to Use This Document

**For designers:**
- Map new features to their layer (e/H-LAM/T/S)
- Check what unlock state they require
- Ensure they progress toward game goals

**For product managers:**
- Align roadmap items to game phases
- Ensure each sprint moves toward federation
- Validate feature order (dependencies)

**For developers:**
- Reference feature codes (P01, V01, etc.)
- Use layer mapping for context/channel organization
- Check unlock state logic for new features

**For organizers:**
- Understand the arc from local → federated
- See how tools enable the cooperative values
- Present the game design to new hubs

---

## References

- **World of Workcraft Design:** [`WORLD_OF_WORKCRAFT.md`](./WORLD_OF_WORKCRAFT.md)
- **Roadmap:** `/app/progress` on co-op.us
- **Existing Features:** `/about/*` sections on co-op.us
- **Co-op.us Source:** https://github.com/Roots-Trust-LCA/co-op.us

---

*World of Workcraft Implementation Guide v1.0*  
*February 21, 2026*  
*The forest is being planted.*
