# World of Workcraft — The Distributed Cooperative Ecosystem Game Design

*co-op.us extended: from single hubs to peer-to-peer forest networks, with explicit specialization, communication, and data ownership.*

---

## Part I: The Shift from Hierarchy to Forest

### From Tree to Forest

In the co-op.us genesis design, each hub operates as an independent **tree** — a single organizational structure rooted in place, governed through the seven-dimensional lens (e/H-LAM/T/S).

World of Workcraft extends this: **together, the hubs form a forest.**

A forest is not a collection of trees managed by a central authority. It is an **ecosystem** where:
- Each tree is autonomous and rooted in its place
- Trees are connected through peer-to-peer relationships, not top-down authority
- Resources (water, nutrients, information) flow through the network
- Communication is local first, global when needed
- Data is held cooperatively, not centrally

**The Forest Covenant** establishes what it means to be a tree in the larger ecosystem:

1. **Root Autonomy**: Each hub governs itself completely. No central authority can override local decisions.
2. **Network Identity**: Your identity (guestname, craft, reputation) is portable across all trees.
3. **Shared Primitives**: All trees use $CLOUD, the chain, and the patronage engine. These are non-negotiable.
4. **Async-First Design**: Communication defaults to asynchronous and local. Synchronous coordination only when needed.
5. **Data Decentralization**: Each tree holds its own data. The forest has no central database.

### The Seven Layers at Hub Scale

Each hub is structured through seven layers (the e/H-LAM/T/S stack extended):

| Layer | What It Holds | Scope |
|-------|--------------|-------|
| **e/ Ecology** | Watershed, geology, season, climate. The physical place. | Local |
| **H/ Human** | Members, contributors, stewards. The people. | Hub + portable to forest |
| **L/ Language** | Shared vocabulary, naming conventions, protocols. | Hub-first, federated |
| **A/ Artifacts** | Projects, documents, tools, ventures. The durable work. | Hub + shared across trees |
| **M/ Methodology** | Governance, coordination patterns, decision protocols. | Hub-specific |
| **T/ Training** | Learning, capability building, knowledge commons. | Hub + shared resources |
| **S/ Sessions** | Gatherings, conversations, convergence events. | Hub + cross-hub sessions |

At the **hub level**, these seven layers are deeply local — parameterized for the specific place and people.

At the **forest level**, these seven layers become **communication channels and coordination surfaces** where trees can interact without losing autonomy.

---

## Part II: Craft Evolution — Specializations

### From Archetype to Specialization

In the base design, a guest selects two crafts (primary + secondary) and becomes one of 64 archetypes. This is the starting point.

World of Workcraft adds **depth**: archetypes evolve into **specializations** through sustained practice.

### The Specialization Unlock System

**Requirements for Specialization:**
- Minimum 20 contributions in the archetype
- At least 40 days in the community
- Demonstrated mastery (reviewed by guild peers)
- Active participation in at least one venture or committee

When these requirements are met, the archetype **branches** into one of six possible specializations, each representing a different *way* of practicing that craft.

### Example: Terraformer Specializations

The **Terraformer** (Code × Earth) can specialize into one of:

| Specialization | Symbol | Focus | Examples |
|---|---|---|---|
| **The Seedkeeper** | 🌱 | Design for regeneration. Building systems that heal. | Ecological monitoring tools, regenerative ag data systems, carbon accounting |
| **The Terraformer** | 🗺️ | Shape the landscape. Large-scale infrastructure. | Watershed mapping, ecosystem modeling, bioregional networks |
| **The Mycologist** | 🍄 | Underground connections. Hidden networks and mycelial thinking. | Peer-to-peer infrastructure, graph databases, knowledge graphs, mesh networks |
| **The Beekeeper** | 🐝 | Living systems. Code that works with biology, not against it. | Pollination algorithms, swarm coordination, biological integration |
| **The Restorer** | 🌳 | Repair and recovery. Fixing what was broken. | Legacy system refactoring, ecological restoration tech, data recovery |
| **The Engineer** | ⚙️ | Raw capability. Precision, scale, optimization. | High-performance systems, critical infrastructure, industrial-grade tools |

No specialization is "better" — only different *expressions* of the craft. A Terraformer can respecialize once per season (every ~3 months).

### Specialization Across All Archetypes

Each of the 64 archetypes branches into 6 specializations, creating **384 possible specializations** in the system.

The naming is always clear: the archetype name + specialization direction.

**Examples across crafts:**

- **Poet** (Word × Word) can specialize into: Myth-maker, Chronicler, Translator, Lyricist, Satirist, or Griot
- **Navigator** (Water × Code) can specialize into: Pathfinder, Connector, Mediator, Archivist, Bridge-builder, or Emissary
- **Firekeeper** (Fire × Fire) can specialize into: Revolutionary, Craftsperson, Catalyst, Healer, Guardian, or Amplifier

### The Specialization Tree

```
Archetype (Primary × Secondary)
  ├─ Specialization A
  ├─ Specialization B
  ├─ Specialization C
  ├─ Specialization D
  ├─ Specialization E
  └─ Specialization F
```

A participant's **contribution history** includes all their specializations — past and present. This creates a visible **craft journey**.

---

## Part III: The Forest Ecosystem — Peer-to-Peer Communication

### The Problem: Hubs in Isolation

A single hub can flourish. But hubs in isolation face limits:
- Knowledge doesn't flow between communities
- Ventures that should be cross-hub remain siloed
- There's no platform for ecosystem-level coordination
- Data lives in separate systems, creating friction

### The Solution: Forest Communication Layers

World of Workcraft defines four communication surfaces, each operating at different scope and rhythm:

#### 1. **Local Channels** (Within a Hub)

Each hub has a **message tree** — a set of channels organized by the seven layers:

```
Hub: Techne (Boulder, Colorado)

├─ e/ Ecology
│  ├─ #watershed-updates
│  ├─ #seasonal-planning
│  └─ #local-projects
│
├─ H/ Human
│  ├─ #introductions
│  ├─ #guild-gatherings (by primary craft)
│  └─ #member-announcements
│
├─ L/ Language
│  ├─ #terminology
│  ├─ #naming-debates
│  └─ #translation
│
├─ A/ Artifacts
│  ├─ #project-updates (by venture)
│  ├─ #resource-library
│  └─ #tools-and-templates
│
├─ M/ Methodology
│  ├─ #governance
│  ├─ #meeting-notes
│  └─ #decision-tracking
│
├─ T/ Training
│  ├─ #learning-circles
│  ├─ #skill-shares
│  └─ #knowledge-base
│
└─ S/ Sessions
   ├─ #upcoming-gatherings
   ├─ #convergence-prep
   └─ #event-notes
```

**Properties:**
- Fully local. No visibility to other hubs unless explicitly shared.
- Asynchronous-first. Tools for threaded discussion, not real-time chat.
- Moderated by hub stewards who know the context.
- Archive on local chain (immutable, verifiable).

---

#### 2. **Inter-Hub Bridges** (Between Specific Hubs)

When two hubs want to coordinate, they form a **bridge** — a dedicated communication channel between them.

```
Bridge: Techne ←→ Nairobi Hub

├─ #shared-ventures
│  ├─ Solar Cooperative (technical coordination)
│  └─ Patronage Research (cross-hub learning)
│
├─ #knowledge-exchange
│  ├─ Ecological patterns in Africa vs. Americas
│  └─ Governance adaptations
│
└─ #economic-flows
   ├─ Cross-hub $CLOUD transactions
   └─ Shared royalty tracking
```

**Forming a Bridge:**
1. Hub A nominates a **bridge steward** — someone who deeply understands both communities
2. Hub B accepts or proposes someone different
3. Together they publish a **covenant** describing what the bridge is for and how decisions flow back to each hub
4. The bridge creates specific channels for that coordination
5. Either hub can dissolve the bridge at any time

**Properties:**
- Requires explicit consent from both hubs
- Decisions made on the bridge don't override local governance
- Bridge stewards are ambassadors, not authorities
- All activity on the bridge is mirrored to both hubs' local archives

---

#### 3. **Guild Chambers** (Global Craft Communities)

The eight primary crafts define the eight **Guild Chambers** — global coordination spaces for people practicing the same craft across all hubs.

```
Guild of the Loom (Code practitioners across all hubs)

├─ #infrastructure-standards
│  │ (coordinating data schema, chain versioning, $CLOUD mechanics)
│
├─ #craft-innovation
│  │ (sharing new patterns, libraries, tools)
│
├─ #specialization-mentoring
│  │ (experienced Seedkeepers, Mycologists, Restorers advising newcomers)
│
├─ #ecosystem-security
│  │ (coordinating on vulnerabilities, incident response)
│
└─ #guild-convergence
   (annual gathering of all Code practitioners)
```

**How Guild Chambers Work:**
- Any member of the craft can read and participate
- Decisions are made by **consensus-seeking**, not voting
- Each guild publishes its own **best practices** and **patterns**
- A hub can choose to adopt or adapt guild standards
- If a hub rejects a critical standard (e.g., security), the federation can enforce via economic pressure (e.g., lowering trust score)

**Guild Officers** (one per hub, elected by local guild members):
- Bridge between local practice and global coordination
- Represent their hub's needs in guild conversations
- No executive power — guidance and consensus-building only

---

#### 4. **Forest Council** (Ecosystem-Level Coordination)

The **Forest Council** is where hubs coordinate on infrastructure, economics, and governance that affect the whole ecosystem.

```
Forest Council

├─ Council Members
│  └─ One steward per hub (rotated annually)
│
├─ Standing Committees
│  ├─ Patronage & Allocation (how $CLOUD distribution works across hubs)
│  ├─ Chain & Cryptography (protocol integrity)
│  ├─ Federation Economics (revenue sharing, infrastructure costs)
│  ├─ Ecology & Bioregionalism (coordinating e/ layer across places)
│  ├─ Learning & Knowledge Commons (T/ layer federation)
│  └─ Conflict Resolution (resolving hub disputes)
│
└─ Decision Protocols
   ├─ Consensus: All affected hubs must agree
   ├─ Substantial Consensus: 80%+ hubs agree; dissenters can opt-out
   ├─ Simple Majority: 50%+ hubs agree; all must implement
   └─ One Hub, Veto: Any hub can veto decisions that threaten its autonomy
```

**What the Forest Council Coordinates:**
- $CLOUD mechanics and inflation/deflation
- Chain schema and cryptographic standards
- Federation infrastructure (shared servers, CDNs, archival)
- Major vulnerabilities and security responses
- Admission of new hubs
- Dissolution of hubs that violate Forest Covenant

**What the Forest Council Cannot Do:**
- Override a hub's local governance
- Require specific ventures or projects
- Set patronage formulas (those are local)
- Remove a member from the federation
- Dictate member expulsion from any hub

---

### Communication Architecture Diagram

```
                    Forest Council
                    (Ecosystem-level)
                           ▲
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   Guild Chambers   Guild Chambers   Guild Chambers
   (Code globally)  (Word globally)  (Earth globally)
        ▲                  ▲                  ▲
        │                  │                  │
        └──────┬───────────┼───────────┬──────┘
               │           │           │
         ┌─────▼─────────┬─▼──────────┬▼─────┐
         │               │            │      │
    Hub A Bridge    Hub B Bridge  Hub C Bridge
    (Techne)      (Nairobi)      (Zurich)
         │               │            │
    Local Channels  Local Channels Local Channels
    (7 layers)      (7 layers)    (7 layers)
```

---

## Part IV: The Digital Infrastructure Trust

### The Problem: Centralization Through Defaults

When hubs rely on a single cloud provider (AWS, Google, etc.), they are not truly autonomous. The provider controls availability, pricing, data access, and can be forced to censure.

World of Workcraft solves this through the **Digital Infrastructure Trust** — a cooperative service that holds and operates computing infrastructure for the federation.

### The Trust Model

**Who Owns It:** Members of the Digital Infrastructure Trust are:
- Any member of any hub (in the federation) can join
- The trust is governed as a cooperative: one member, one vote
- Initial board: technical stewards from 3+ hubs (elected annually)

**What It Does:**
- Operates shared computing infrastructure (servers, storage, networking)
- Provides services to hubs on a cost-recovery basis
- Maintains data residency and privacy guarantees
- Handles archival and disaster recovery
- Coordinates security updates and incident response

**Services Offered:**

| Service | Cost | SLA | Notes |
|---------|------|-----|-------|
| **Chain Archive** | $CLOUD/byte/year | 99.9% uptime | Immutable storage of local chain + federation chain |
| **Message Storage** | $CLOUD/message/year | 99.9% uptime | Hub message archives, guild chambers, bridges |
| **Compute** | $CLOUD/core-hour | Service-level agreement per use case | For patronage calculations, data processing, analysis |
| **Transfer** | $CLOUD/GB | Cost-based | Data movement between hubs, backups, replication |
| **Identity Service** | $CLOUD/identity/year | 99.99% uptime | Guestname resolution, public key infrastructure, reputation data |

**Example:** A hub storing 500GB of chain data, 50GB of messages, running quarterly patronage reports:
```
Chain Archive:       500 GB × $0.001/GB-year = $500/year ≈ 500 $CLOUD
Message Storage:     50 GB × $0.001/GB-year = $50/year ≈ 50 $CLOUD
Compute (quarterly): 4 runs × 2 hours × $0.05/core-hour ≈ 100 $CLOUD
Annual Cost:                                    ≈ 650 $CLOUD (~$65)
```

### Data Governance in the Trust

**Core Principles:**

1. **Data Locality**: Each hub's data is held in the region it operates in (Boulder data stays in Colorado, Nairobi data in Kenya). Exception: encrypted backups for disaster recovery.

2. **Encryption by Default**: Data at rest and in transit uses end-to-end encryption. Hubs control their own keys. The Trust never holds plaintext of sensitive data.

3. **Access Transparency**: Every access to data (even for backups or monitoring) is logged on the chain. Hubs can audit the Trust.

4. **Economic Efficiency**: The Trust operates at cost. Surplus revenue is returned to members as $CLOUD credits or reinvested in infrastructure.

5. **Exit Right**: Any hub can leave and retrieve its data in an open format (JSON, standard SQL dumps, etc.) with 60 days notice.

### Trust Operations

**Governance:**
- Annual election of board (3-5 stewards from different hubs)
- Quarterly financial reports (audited, posted on chain)
- Any member can propose infrastructure improvements
- Decisions made by consensus of board; major decisions by member vote

**Technical Oversight:**
- Independent security audits (annual, paid by trust)
- Open-source core infrastructure (code published, auditable)
- Bug bounty program (funded from operational budget)
- Incident response plan published and tested annually

**Exit & Failure Scenarios:**
- If the Trust dissolves: all data reverts to hubs in encrypted form
- If a hub leaves: data is exported within 60 days
- If infrastructure fails: geographically distributed backups ensure recovery within hours

---

## Part V: Specialization, Communication, and Economic Flow

### Example: A Cross-Hub Venture

Let's trace how the system works in practice.

**Scenario:** The **Pollination Network** — a distributed venture for monitoring and protecting pollinators across North America and Africa.

**Participants:**

| Name | Hub | Archetype | Specialization |
|------|-----|-----------|---|
| Maya | Techne | Terraformer (Code × Earth) | Beekeeper |
| Ahmed | Nairobi | Navigator (Water × Code) | Connector |
| Keisha | Techne | Grower (Earth × Earth) | Restorer |
| Kwame | Accra | Beekeeper (Earth × Sound) | Guardian |
| Sofia | Zurich | Seedkeeper (Earth × Earth) | Seedkeeper |

**Project Structure:**

1. **Local Phase** (Weeks 1-4)
   - Each hub opens an `#pollination-network` channel under A/ Artifacts
   - Local guilds (Earth practitioners, Code practitioners) review the proposal
   - Each hub separately approves resource allocation
   - Each contributor gets recorded on their local chain

2. **Bridge Formation** (Week 5)
   - Techne and Nairobi form a **Techne ↔ Nairobi Bridge** to coordinate technical work
   - Techne and Accra form a separate **Techne ↔ Accra Bridge** for ecosystem research
   - Zurich joins by forming **Zurich ↔ Techne Bridge**
   - Each bridge has specific channels for the Pollination Network

3. **Guild Coordination** (Ongoing)
   - The **Guild of the Root** (Earth practitioners) maintains an `#ecology-standards` channel coordinating data collection across all hubs
   - The **Guild of the Loom** (Code practitioners) maintains a `#data-infrastructure` channel coordinating the sensor network and data pipeline

4. **Patronage & Revenue** (Ongoing)
   - Each contribution (Maya's code, Ahmed's coordination, Keisha's field research, etc.) is recorded on the local chain
   - All contributions are timestamped and attributed
   - When (if) the Pollination Network generates revenue (e.g., licensing to governments, selling data products):
     - Revenue flows to the hub where the venture is "domiciled" (Techne, for this example)
     - Techne calculates royalties based on patronage (labor hours, capital contributions, etc.)
     - Royalties flow back to all participating hubs based on contribution percentage
     - Each hub distributes its royalties to members according to its own patronage formula

5. **Digital Infrastructure** (Ongoing)
   - All sensor data, analysis, and documentation is stored through the Digital Infrastructure Trust
   - Cost is split among participating hubs based on their storage consumption
   - Each hub can request data export in open format anytime

**What This Enables:**

- **No centralization**: No single hub controls the venture; no VC funding needed
- **Local autonomy**: Each hub retains control of its people, decisions, and resources
- **Transparent economics**: All contributions and revenue flows are visible on the chain
- **Portable identity**: Maya's reputation as a Beekeeper-Terraformer is recognized across all hubs
- **Ecosystem visibility**: The Forest Council can see which ventures are thriving, which need support
- **Data ownership**: The Pollination Network data is held cooperatively, not in a single cloud account

---

## Part VI: Bringing It All Together

### The Game Loop in World of Workcraft

**For a Individual Participant:**

1. **Arrive** → choose guestname, select primary & secondary craft (archetype)
2. **Contribute** → make contributions to projects, earn $CLOUD
3. **Specialize** → after 20 contributions, unlock and choose a specialization
4. **Explore** → discover guild chambers, bridges, forest council
5. **Steward** → take responsibility for a venture or committee
6. **Transform** → respecialize seasonally as your practice evolves
7. **Gather** → attend sessions (local gatherings, cross-hub convergences, guild summits)

**For a Hub:**

1. **Found** → register with the federation, choose governance model, parameterize for local context
2. **Connect** → form bridges with other hubs for specific collaboration
3. **Participate** → join relevant guild chambers and forest council
4. **Venture** → incubate projects that serve local needs
5. **Share** → make knowledge and tools available to other hubs
6. **Earn** → generate revenue from ventures, distribute as patronage
7. **Evolve** → adapt governance, specialization options, and ecology based on learning

**For the Forest:**

1. **Coordinate** → forest council maintains core infrastructure and standards
2. **Trust** → digital infrastructure trust holds data and compute cooperatively
3. **Flourish** → each hub thrives locally while staying connected to the whole
4. **Grow** → new hubs form and integrate seamlessly
5. **Recover** → if a hub is in crisis, others can provide support
6. **Adapt** → ecosystem learns and evolves based on distributed experience

### Design Patterns Made Explicit

World of Workcraft makes the underlying design patterns visible through the game mechanics:

| Pattern | Where You See It | Game Mechanic |
|---------|-----------------|---|
| **Subsidiarity** | Local governance at all scales | Each hub chooses its own parameters; forest council only coordinates shared infrastructure |
| **Transparency** | Chain records everything | All contributions, transactions, and decisions are immutable and auditable |
| **Participation** | Progressive dimension reveal | Seven layers unlock as you engage deeper |
| **Craft as Identity** | Archetypes and specializations | Your work shapes how you're recognized and what opportunities open to you |
| **Economic Justice** | Patronage-based allocation | Contributions matter more than capital; value is shared |
| **Resilience** | Distributed data and governance | No single point of failure; hubs can exit or recover independently |
| **Emergence** | Guild chambers and bridges | New forms of coordination arise from peer connection, not top-down design |

### Seasons and Rhythms

World of Workcraft uses natural seasons to structure the game:

**Spring** (Feb-Apr)
- Specialization reforging season
- Guild chambers reconvene
- New ventures launch
- $CLOUD refresh (members earn new allocation)

**Summer** (May-Jul)
- Venture execution season
- Cross-hub convergences
- Training and learning circles
- Guild summits (in-person gatherings)

**Autumn** (Aug-Oct)
- Harvest season (ventures mature and generate revenue)
- Patronage calculations begin
- Forest council meets for annual review
- Reappraisal of governance parameters

**Winter** (Nov-Jan)
- Reflection and planning season
- Infrastructure maintenance
- Long-term learning (skill development)
- Hub convergences (annual)

---

## Part VII: Governance by Design

### Decision Rights by Layer

**Local (Hub) Level:**
- Who can be a member
- Governance structure and voting rules
- Patronage formula (weights for labor, capital, community, etc.)
- Which ventures to support
- Dimension unlock pace
- Aesthetic and branding

**Bridge (Two-Hub) Level:**
- What coordination is needed
- How to resolve conflicts between hubs
- How to split costs and revenue
- When to escalate to forest council

**Guild (Global Craft) Level:**
- Best practices and standards
- Training materials and certifications
- Specialization requirements and definitions
- Ethics and conduct standards for the craft

**Forest (Ecosystem) Level:**
- $CLOUD mechanics and stability
- Chain schema and cryptographic standards
- Digital infrastructure trust operations
- Federation admission and exit
- Conflict resolution between hubs

### Conflict Resolution

If two hubs disagree:

1. **Bridge negotiation** (if connected): bridge stewards mediate
2. **Guild mediation** (if craft-related): relevant guild chair facilitates
3. **Forest council arbitration** (if ecosystem-level): council proposes resolution, both hubs have veto
4. **Exit right**: If unresolvable, either hub can leave the federation

The system is designed to make conflict expensive and exit easy — incentivizing cooperation.

---

## Part VIII: Implementation Notes

### Phase 1: Foundation (Months 1-3)

- [x] Core game documents (archetypes, hubs, dimensions, cloud)
- [ ] Specialization system implemented in co-op.us code
- [ ] Guild chamber infrastructure built
- [ ] First cross-hub bridge established (Techne ↔ second hub)
- [ ] Digital Infrastructure Trust chartered

### Phase 2: Expansion (Months 4-9)

- [ ] Second hub launches (parameterized for local context)
- [ ] Guild summits held (one per craft)
- [ ] Cross-hub venture incubated (like Pollination Network example)
- [ ] Forest Council established and meets quarterly
- [ ] Bridge protocols refined based on practice

### Phase 3: Maturation (Months 10+)

- [ ] 5+ hubs operating in federation
- [ ] Guild chambers self-governing
- [ ] Digital Infrastructure Trust operating independently
- [ ] Seasoned specializations unlocked (multiple refoges visible)
- [ ] Ecosystem documentation generated by community

### Key Technical Decisions

**Data Storage:**
- Hub data is local + encrypted backup in trust
- Cross-hub visibility is opt-in per channel
- Public data (profiles, artifacts) is cached locally for performance

**Communication:**
- Asynchronous-first (threads, not chat)
- Guild chambers use federation-wide shared storage
- Bridges use encrypted point-to-point replication

**Economics:**
- $CLOUD supply: fixed supply, earned through contribution
- Patronage calculation: parameterized per hub, transparent
- Cross-hub royalties: calculated on contribution, routed automatically

**Governance:**
- One hub, one vote in forest council (no weighted voting by size)
- Specializations defined by guilds, not central authority
- Bridge covenants published and enforceable

---

## Epilogue: Why This Matters

**The Core Insight:**

Most online communities and organizations face a hard choice:
- Centralize for efficiency and coordination
- Decentralize for autonomy and resilience

World of Workcraft proposes a third way: **distributed coordination through explicit design**.

By making communication structures, craft specialization, and economic flows **legible and peer-to-peer**, we enable ecosystems that are:

- **Locally rooted** — each hub thrives in its specific place
- **Globally aware** — hubs see each other and can collaborate
- **Economically just** — value flows based on contribution, not concentration
- **Resilient** — no single point of failure; exit is always an option
- **Emergent** — new forms of coordination arise from practice, not planning

This is not a game bolted on top of cooperation. It is cooperation *designed as* a game — with visible rules, clear progression, shared identity, and persistent stakes.

The stakes are real. The world is real. The forest is being planted.

---

*World of Workcraft is a living design document. It evolves through federation practice. Amendments are proposed through guild chambers and forest council. Adopted amendments are recorded on the chain.*

**Current Version:** 1.0 (Feb 21, 2026)
**Last Amended:** —
**Maintainers:** Guild of the Loom (technical), Guild of the Quill (documentation), Forest Council (governance)

---

## Appendix A: Specialization Reference

### All 8 Crafts × 6 Specializations = 48 Specialization Paths

*(Detailed definitions by craft community; this is a template)*

**Code × Code (Logician):**
1. Theorist — Pure algorithms and formal systems
2. Builder — Production-grade systems
3. Hacker — Unconventional solutions and exploration
4. Gardener — Maintenance and legacy code stewardship
5. Teacher — Mentorship and skill transfer
6. Archaeologist — Understanding and recovering old systems

**Word × Word (Poet):**
1. Myth-maker — Narrative and world-building
2. Chronicler — Documentation and history
3. Translator — Bridging languages and meaning
4. Lyricist — Language as music
5. Satirist — Critique and humor
6. Griot — Oral tradition and memory-keeping

*(Remaining 6 crafts follow similar pattern)*

---

## Appendix B: Bridge Covenant Template

```
BRIDGE COVENANT

Between: Hub A ↔ Hub B
Established: [DATE]
Stewards: [Name, Hub A] ↔ [Name, Hub B]

PURPOSE:
[Description of what this bridge coordinates]

CHANNELS:
[List of specific coordination channels]

DECISION RIGHTS:
- Routine decisions: Bridge stewards can act
- Major decisions: Both hub councils must approve
- Conflicts: Escalate to forest council

ECONOMIC TERMS:
- Shared costs: [% split]
- Revenue sharing: [Formula based on contribution]
- Sunset clause: [When/if bridge is reevaluated]

DISSOLUTION:
Either hub can dissolve with 60 days notice.
Data is exported to both hubs in open format.

Signed: Hub A Council, Hub B Council
On chain: [MERKLE HASH]
```

---

## Appendix C: Digital Infrastructure Trust Bylaws

*(Excerpt)*

**Article I: Membership**
- Open to all members of federation hubs
- One member, one vote
- Annual election of board (3-5 stewards)

**Article II: Services & Pricing**
- Services priced at cost + 10% reserve fund
- Surplus returned to members as credits
- All pricing published quarterly

**Article III: Data Rights**
- Hubs retain full ownership of their data
- End-to-end encryption throughout
- Access audit trails on chain

**Article IV: Governance**
- Board makes operational decisions
- Members vote on major policy changes
- Quarterly financial reports

**Article V: Exit**
- Any hub can leave with 60 days notice
- Data exported within 30 days
- Exit fee: pro-rated storage costs only

---

*End of World of Workcraft Design Document*
