# Workcraft Product Roadmap

**Document Version:** 1.0  
**Date:** February 22, 2026  
**Product Owner:** Product Engineer (TIO)  
**Review Cadence:** Monthly

---

## Product Vision

**World of Workcraft** enables ecosystems of autonomous organizations to coordinate without centralizing — preserving local autonomy while achieving global coherence.

---

## Strategic Themes

### Theme 1: Foundation (Phase 1)
**Make work legible within a single organization.**

Professional profiles, engagement tracking, capacity visibility, contribution verification, recognition levels.

### Theme 2: Federation (Phase 2)
**Enable coordination across organizational boundaries.**

Practice communities, node bridges, cross-node contribution tracking, domain expertise.

### Theme 3: Economic Infrastructure (Phase 3)
**Align economic flows with contribution.**

Credit system, patronage integration, Digital Infrastructure Trust, federation governance.

---

## Planning Model

**Approach:** Dependency-driven planning (not time-based)

**Why:** Agent-driven development has different constraints than human labor:
- Near-unlimited parallel capacity
- Zero context-switching cost
- Constraints are: API limits, compute, data availability, dependency order

**Release Triggers:** Features + readiness criteria (not calendar dates)

See: [TIO Procedure 001 — Dependency-Driven Planning](../../tio/procedures/DEPENDENCY_DRIVEN_PLANNING.md)

---

## Phase 1: Foundation

### Objective
Deploy core coordination infrastructure for single-node deployment with professional profile system, engagement tracking, capacity management, contribution ledger, and recognition levels.

**Completion Trigger:** All epics complete + 100% organizer onboarding

### Key Results
- ✅ 100% of Techne organizers have professional profiles
- ✅ 50+ engagements created and tracked
- ✅ 200+ contributions verified
- ✅ Capacity over-allocation reduced by 50%
- ✅ First recognition level advancements (Contributor → Steward)

### Epics

#### EPIC-001: Professional Profile System
**Stories:**
- [ ] PROF-001: User can select primary and secondary functions
- [ ] PROF-002: System generates professional profile name
- [ ] PROF-003: Profile visible on public profile page
- [ ] PROF-004: Profile update limited to once per quarter
- [ ] PROF-005: Domain expertise unlocks after 20 contributions
- [ ] PROF-006: User can select expertise path (6 options)
- [ ] PROF-007: Professional journey timeline view
- [ ] PROF-008: Export profile as PDF

**Acceptance Criteria:**
- All 64 professional profiles named and documented
- Domain expertise paths defined for all profiles
- Profile creation flow completes in <2 minutes

#### EPIC-002: Engagement Classification
**Stories:**
- [ ] ENG-001: Create engagement with type selection
- [ ] ENG-002: Engagement board with filters
- [ ] ENG-003: Claim role in engagement
- [ ] ENG-004: Engagement lifecycle (Draft → Active → Complete)
- [ ] ENG-005: Cross-functional initiative role definitions
- [ ] ENG-006: Engagement notifications (overdue, complete)

**Acceptance Criteria:**
- All 4 engagement types supported
- Engagement creation flow completes in <5 minutes
- Role claiming requires approval workflow

#### EPIC-003: Capacity Management
**Stories:**
- [ ] CAP-001: Weekly capacity budget (default 100 units)
- [ ] CAP-002: Capacity allocation on engagement claim
- [ ] CAP-003: Capacity dashboard (Total/Allocated/Available)
- [ ] CAP-004: Over-allocation warning (>100%)
- [ ] CAP-005: Recovery bonus after rest (+10 units)
- [ ] CAP-006: Utilization history (4 weeks)
- [ ] CAP-007: Manager approval for over-allocation

**Acceptance Criteria:**
- Capacity visible before engagement claim
- Recovery bonus calculates correctly
- Dashboard loads in <2 seconds

#### EPIC-004: Contribution Ledger
**Stories:**
- [ ] CONT-001: Submit contribution against engagement
- [ ] CONT-002: Contribution verification workflow
- [ ] CONT-003: Auto-verification by engagement type
- [ ] CONT-004: Multi-party verification for cross-functional
- [ ] CONT-005: Contribution history view
- [ ] CONT-006: Export contributions (JSON/CSV)
- [ ] CONT-007: Immutable chain recording

**Acceptance Criteria:**
- Verification workflow completes within SLA (24-72h)
- Contribution record is immutable after verification
- Export includes all required fields

#### EPIC-005: Recognition Levels
**Stories:**
- [ ] REC-001: Automatic level calculation (5/20/50 contributions)
- [ ] REC-002: Recognition level visible on profile
- [ ] REC-003: Progress bar to next level
- [ ] REC-004: Milestone notifications
- [ ] REC-005: Governance weight tied to level (future)
- [ ] REC-006: Recognition ceremony workflow (cultural)

**Acceptance Criteria:**
- Level updates within 24 hours of threshold
- Notification system functional
- Level visible in all appropriate contexts

---

## Phase 2: Federation

### Objective
Enable multi-node coordination with practice communities, bilateral bridges, and cross-node contribution tracking.

**Completion Trigger:** Phase 1 stable + 2nd node operational + bridge covenant signed

### Key Results
- ✅ 3+ nodes operating in federation
- ✅ 5+ node bridges established
- ✅ 8 practice communities active (one per function)
- ✅ 100+ cross-node contributions tracked
- ✅ First practice community summits held

### Epics

#### EPIC-010: Practice Communities
**Stories:**
- [ ] PC-001: Create practice community (8 functions)
- [ ] PC-002: Join practice community
- [ ] PC-003: Community channels (infrastructure, innovation, mentoring)
- [ ] PC-004: Community officer election
- [ ] PC-005: Standards development workflow
- [ ] PC-006: Community summit planning

**Acceptance Criteria:**
- All 8 practice communities launched
- Officer election completes successfully
- Standards published and adoptable

#### EPIC-011: Node Bridges
**Stories:**
- [ ] BRIDGE-001: Bridge formation protocol
- [ ] BRIDGE-002: Bridge covenant template
- [ ] BRIDGE-003: Bridge steward nomination
- [ ] BRIDGE-004: Cross-node channel creation
- [ ] BRIDGE-005: Data replication with encryption
- [ ] BRIDGE-006: Bridge dissolution workflow

**Acceptance Criteria:**
- Bridge formation completes in <1 week
- Data replication is encrypted and mirrored
- Either node can dissolve bridge

#### EPIC-012: Cross-Node Contributions
**Stories:**
- [ ] CNC-001: Track contributions across nodes
- [ ] CNC-002: Portable contribution record
- [ ] CNC-003: Cross-node verification workflow
- [ ] CNC-004: Contribution visibility by node
- [ ] CNC-005: Aggregate contribution history

**Acceptance Criteria:**
- Contributions visible in both nodes
- Verification workflow respects node sovereignty
- Aggregate history is accurate

#### EPIC-013: Domain Expertise
**Stories:**
- [ ] EXP-001: Expertise path selection UI
- [ ] EXP-002: Expertise verification (peer review)
- [ ] EXP-003: Respecialization workflow (once per season)
- [ ] EXP-004: Expertise visible on profile
- [ ] EXP-005: Expertise-based routing (future)

**Acceptance Criteria:**
- All 384 expertise paths (64 profiles × 6 paths) defined
- Respecialization limited to once per 3 months
- Expertise visible to all nodes

---

## Phase 3: Economic Infrastructure

### Objective
Deploy full economic infrastructure with credit system, patronage integration, and federation governance.

**Completion Trigger:** Phase 2 stable + 5+ nodes + legal entity (DIT) incorporated

### Key Results
- ✅ $CLOUD credit system operational
- ✅ Patronage calculations automated
- ✅ Digital Infrastructure Trust incorporated
- ✅ Federation Council meeting quarterly
- ✅ 5+ nodes with economic integration
- ✅ Royalty system operational (shared asset revenue share)

### Epics

#### EPIC-020: Credit System
**Stories:**
- [ ] CREDIT-001: Credit account creation
- [ ] CREDIT-002: Earn credits through contributions
- [ ] CREDIT-003: Credit transfer between members
- [ ] CREDIT-004: Credit balance visibility
- [ ] CREDIT-005: Credit transaction history
- [ ] CREDIT-006: Credit marketplace (future)

**Acceptance Criteria:**
- Credits awarded on contribution verification
- Transfer is secure and auditable
- Balance updates in real-time

#### EPIC-021: Patronage Integration
**Stories:**
- [ ] PAT-001: Contribution-to-patronage bridge
- [ ] PAT-002: Patronage formula configuration
- [ ] PAT-003: Allocation cycle management
- [ ] PAT-004: Patronage calculation engine
- [ ] PAT-005: Patronage distribution
- [ ] PAT-006: Patronage history explorer

**Acceptance Criteria:**
- Patronage calculation is transparent
- Formula is parameterizable (40/30/20/10)
- Distribution completes within SLA

#### EPIC-022: Digital Infrastructure Trust
**Stories:**
- [ ] TRUST-001: Trust service deployment
- [ ] TRUST-002: Chain archive service
- [ ] TRUST-003: Message storage service
- [ ] TRUST-004: Compute service
- [ ] TRUST-005: Identity service
- [ ] TRUST-006: Trust governance (board election)

**Acceptance Criteria:**
- All 5 services operational
- Data locality enforced
- Exit right supported (60 days notice)

#### EPIC-023: Federation Council
**Stories:**
- [ ] FED-001: Council member selection (one per node)
- [ ] FED-002: Standing committees (6 committees)
- [ ] FED-003: Decision protocols (consensus, substantial, majority)
- [ ] FED-004: Veto mechanism
- [ ] FED-005: Council meeting scheduling
- [ ] FED-006: Decision recording on chain

**Acceptance Criteria:**
- All nodes represented
- Decision protocols functional
- Vetoes respected

#### EPIC-024: Royalties & Revenue Share
**Stories:**
- [ ] ROY-001: Asset registration (shared IP, code, content, designs)
- [ ] ROY-002: Contribution-to-royalty mapping (link contributions to assets)
- [ ] ROY-003: Revenue event recording (license fees, sales, subscriptions)
- [ ] ROY-004: Royalty formula configuration (per-asset or per-category)
- [ ] ROY-005: Automatic royalty calculation (per revenue event)
- [ ] ROY-006: Royalty distribution workflow (to contributor accounts)
- [ ] ROY-007: Royalty history explorer (per asset, per contributor)
- [ ] ROY-008: Multi-tier royalty splits (primary/secondary contributors)
- [ ] ROY-009: Royalty covenant template (for cross-node asset sharing)
- [ ] ROY-010: Royalty dashboard (earnings, pending, distributed)

**Acceptance Criteria:**
- Asset registration completes in <5 minutes
- Royalty calculation triggers automatically on revenue event
- Distribution completes within 24 hours of calculation
- Contributors can view expected vs. received royalties
- Cross-node royalty covenants enforceable via bridge protocol
- Aligns with co-op.us/app/progress economic layer (Evolution 3)

**Dependencies:**
- EPIC-004 (Contribution Ledger) — requires verified contributions
- EPIC-020 (Credit System) — distributes to credit accounts
- EPIC-021 (Patronage Integration) — parallel allocation system

---

## Prioritization Framework

### RICE Scoring

**Reach:** How many users affected?  
**Impact:** How much does this move the needle? (0.25-3x)  
**Confidence:** How sure are we? (50-100%)  
**Effort:** Compute/resource units (API calls, compute hours, storage)

**Priority Score = (Reach × Impact × Confidence) / Effort**

**Note:** "Effort" for agent-driven development measures resource consumption, not time. A task requiring 1000 API calls at 10/minute has effort = 100 call-minutes, regardless of wall-clock time.

### Phase 1 Priorities (Top 5)

1. **EPIC-003: Capacity Management** — Solves burnout problem immediately
2. **EPIC-001: Professional Profile System** — Foundation for all other work
3. **EPIC-004: Contribution Ledger** — Enables patronage tracking
4. **EPIC-002: Engagement Classification** — Clarifies coordination requirements
5. **EPIC-005: Recognition Levels** — Retention through recognition

### Dependencies

```
EPIC-001 (Profiles) → EPIC-005 (Recognition)
EPIC-002 (Engagements) → EPIC-004 (Contributions)
EPIC-003 (Capacity) → Independent
EPIC-004 (Contributions) → EPIC-021 (Patronage) [Phase 3]
EPIC-010 (Practice Communities) → EPIC-011 (Bridges)
EPIC-020 (Credits) → EPIC-021 (Patronage)
EPIC-022 (Trust) → EPIC-023 (Federation Council)
```

---

## Release Schedule

**Note:** Releases are triggered by feature completion and readiness criteria, not calendar dates.

### Release 1.0 (MVP)
**Trigger:** Phase 1 epics 1-2 complete + staging deployment verified  
**Features:** PROF-001-003, ENG-001-002

### Release 1.1
**Trigger:** Release 1.0 stable + Phase 1 epics 3-4 complete  
**Features:** CAP-001-003, CONT-001-002

### Release 1.2
**Trigger:** Release 1.1 stable + Phase 1 epic 5 complete + organizer onboarding complete  
**Features:** REC-001-004, CONT-003-007, CAP-004-007

### Release 2.0 (Federation)
**Trigger:** Release 1.2 stable + 2nd node operational + bridge covenant signed  
**Features:** PC-001-006, BRIDGE-001-006

### Release 2.1
**Trigger:** Release 2.0 stable + cross-node contribution tracking verified  
**Features:** CNC-001-005, EXP-001-005

### Release 3.0 (Economic Infrastructure)
**Trigger:** Release 2.1 stable + 5+ nodes + legal entity (DIT) incorporated  
**Features:** CREDIT-001-006, PAT-001-006

### Release 3.1
**Trigger:** Release 3.0 stable + Trust services operational + Federation Council seated  
**Features:** TRUST-001-006, FED-001-006

### Release 3.2 (Royalties)
**Trigger:** Release 3.1 stable + revenue event tracking configured + first asset registered  
**Features:** ROY-001-010

---

## Success Metrics by Phase

### Phase 1 Metrics
- **Adoption:** 100% of Techne organizers with profiles
- **Activity:** 50+ engagements, 200+ contributions
- **Quality:** 99.9% uptime, <500ms API response
- **Impact:** 50% reduction in over-allocation

### Phase 2 Metrics
- **Adoption:** 3+ nodes, 5+ bridges
- **Activity:** 100+ cross-node contributions
- **Quality:** 99.9% uptime, encrypted replication
- **Impact:** First practice community summits held

### Phase 3 Metrics
- **Adoption:** 5+ nodes with economic integration
- **Activity:** $CLOUD circulation, patronage distributions
- **Quality:** Trust SLA met, governance functional
- **Impact:** Economic justice measurable (patronage formula)

---

## Risk Register

### High Priority Risks

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|------------|-------|
| Low adoption (users don't create profiles) | High | Medium | Onboarding flow, executive sponsorship | Product Engineer |
| Verification bottleneck | Medium | High | Auto-verification, multiple verifiers | Technical Lead |
| Schema doesn't support federation | High | Medium | Design multi-node from start | Schema Architect |
| Performance degrades with scale | High | Medium | Load testing, indexing strategy | Backend Engineer |

### Medium Priority Risks

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|------------|-------|
| Capacity limits feel restrictive | Medium | Medium | Education, adjustable budgets | Product Engineer |
| Perceived as surveillance tool | High | Medium | User control, transparency | Product Engineer |
| Loss of cultural identity | Medium | Medium | Maintain culture track | Product Engineer |

---

## Change Log

| Date | Version | Change | Author |
|------|---------|--------|--------|
| 2026-02-22 | 1.0 | Initial roadmap | Product Engineer |

---

*Workcraft Product Roadmap v1.0*  
*Technology and Information Office (TIO) — Techne Studio*
