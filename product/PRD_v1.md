# Product Requirements Document: World of Workcraft

**PRD Version:** 1.0  
**Date:** February 22, 2026  
**Status:** Draft for Review  
**Product Owner:** Product Engineer (TIO)  
**Technical Lead:** [TBD]  
**Stakeholders:** Techne Studio, RegenHub LCA, Federation Council (future)

---

## 1. Executive Summary

### 1.1 Product Vision

World of Workcraft (WoWc) is a **distributed coordination infrastructure** that makes organizational work legible through explicit design. It transforms how cooperative networks coordinate by making communication structures, professional development, and economic flows visible and peer-to-peer.

**Vision Statement:** Enable ecosystems of autonomous organizations to coordinate without centralizing — preserving local autonomy while achieving global coherence.

### 1.2 Problem Statement

**The Coordination Dilemma:** Organizations face a false choice:
- **Centralize** → Efficiency and coordination, but loss of autonomy
- **Decentralize** → Resilience and autonomy, but fragmentation

**Current Pain Points:**
1. Cross-organizational projects lack clear role coordination
2. Professional contributions are invisible across organizational boundaries
3. Economic value concentrates rather than flowing to contributors
4. Knowledge silos prevent ecosystem-level learning
5. No portable professional identity that travels across organizations

### 1.3 Value Proposition

**For Individuals:**
- Visible capability development through verified contributions
- Portable professional identity recognized across the federation
- Transparent economic participation (see how work converts to value)
- Sustainable capacity management (prevent burnout through visibility)

**For Organizations:**
- Clear engagement classification (Standing, Process Improvement, Strategic, Cross-Functional)
- Cross-functional coordination without hierarchy
- Retention through recognition and growth paths
- Economic alignment with contribution

**For the Ecosystem:**
- Resilient infrastructure (no single point of failure)
- Knowledge flow without extraction
- Economic justice built into the operating system
- Emergent coordination (standards arise from practice)

---

## 2. Product Scope

### 2.1 In Scope (Phase 1: Months 1-3)

**Foundation Capabilities:**
1. **Professional Profile System** — Primary × Secondary function (64 profiles)
2. **Engagement Classification** — Four engagement types with clear scope
3. **Capacity Dashboard** — Resource visibility and allocation tracking
4. **Contribution Ledger** — Immutable record of verified work
5. **Recognition Levels** — Contributor, Steward, Principal progression

**Technical Deliverables:**
- PostgreSQL schemas for profiles, engagements, contributions, capacity
- API endpoints for profile management, engagement tracking, contribution verification
- React dashboard components for capacity, engagements, contributions
- Integration with existing co-op.us authentication and member system

### 2.2 In Scope (Phase 2: Months 4-9)

**Federation Capabilities:**
1. **Practice Communities** — Global professional communities by function
2. **Node Bridges** — Bilateral coordination channels between organizations
3. **Domain Expertise** — Specialization paths (6 per professional profile)
4. **Cross-Node Contribution Tracking** — Portable contribution record

### 2.3 In Scope (Phase 3: Months 10+)

**Economic Infrastructure:**
1. **Credit System** — Internal value exchange ($CLOUD)
2. **Patronage Integration** — Contribution-to-allocation bridge
3. **Digital Infrastructure Trust** — Cooperative data infrastructure
4. **Federation Council** — Ecosystem governance

### 2.4 Out of Scope (Phase 1)

**Explicitly Not Building:**
- ❌ Vanity metrics (XP grinding without economic value)
- ❌ Cosmetic badges/achievements (professionals care about impact)
- ❌ Complex gamification (no "combat logs," "mini-maps," or game UI metaphors)
- ❌ Fake reward loops (all recognition tied to verified contribution)
- ❌ Gaming vocabulary in professional contexts (use enterprise track documentation)

**Design Principle:** Only build coordination mechanics that solve real organizational problems or make economic sustainability more likely.

---

## 3. User Personas

### 3.1 Primary Personas

#### Maya — The Terraformer (Individual Contributor)
**Role:** Systems Developer at Techne Studio  
**Professional Profile:** Code × Earth (Terraformer)  
**Goals:**
- Track contributions across multiple ventures
- Develop domain expertise in Living Systems Integration
- Build portable professional reputation
- Avoid burnout through capacity visibility

**Pain Points:**
- Currently overcommitted (no visibility into total load)
- Contributions not visible to other hubs in federation
- No clear path to Steward recognition
- Unclear how work translates to patronage allocation

**WoWc Solutions:**
- Capacity dashboard shows allocated vs. available
- Contribution ledger provides immutable record
- Professional profile portable across federation
- Recognition level progression clearly defined

#### Todd — The Product Engineer (Organizational Leader)
**Role:** Ventures & Operations Steward, Techne  
**Professional Profile:** Fire × Water (Catalyst)  
**Goals:**
- Coordinate cross-functional initiatives without hierarchy
- Ensure economic alignment with contribution
- Retain talent through visible growth paths
- Scale coordination as federation grows

**Pain Points:**
- Multi-venture coordination is ad-hoc
- No system for tracking cross-organizational contributions
- Patronage calculations are manual and opaque
- Hard to identify stewards for new initiatives

**WoWc Solutions:**
- Engagement classification clarifies coordination requirements
- Cross-functional initiative structure defines roles
- Contribution ledger provides data for patronage
- Recognition levels identify potential stewards

#### Ahmed — The Bridge Steward (Cross-Node Coordinator)
**Role:** Hub Coordinator, Nairobi Node  
**Professional Profile:** Water × Code (Navigator)  
**Goals:**
- Coordinate bilateral ventures with Techne
- Ensure knowledge flows between hubs
- Maintain local autonomy while participating in federation
- Build bridge covenant for Pollination Network venture

**Pain Points:**
- No structured way to form inter-hub coordination
- Data sharing requires ad-hoc solutions
- Unclear how decisions flow back to each hub
- No shared contribution tracking for cross-hub ventures

**WoWc Solutions:**
- Bridge formation protocol with covenant template
- Data replication with encryption and mirroring
- Clear decision rights defined in covenant
- Cross-node contribution tracking

### 3.2 Secondary Personas

- **Practice Community Officer** — Leads global craft community (e.g., Code Practitioners)
- **Federation Council Steward** — Represents node in ecosystem governance
- **Compliance Engineer** — Ensures data sovereignty and access control
- **HR Professional** — Integrates WoWc with existing career frameworks

---

## 4. Functional Requirements

### 4.1 Professional Profile System

**FR-001: Profile Creation**
- Users can select primary function (8 options) and secondary function (8 options)
- System generates professional profile name (e.g., "Terraformer" for Code × Earth)
- Profile is visible on user's public profile page
- Profile can be updated once per quarter (to prevent gaming)

**FR-002: Domain Expertise Unlock**
- After 20+ contributions in a professional profile, domain expertise unlocks
- User can select one of 6 expertise paths for their profile
- Expertise selection is visible on profile
- User can respecialize once per season (3 months)

**FR-003: Professional Journey**
- System tracks all past professional profiles and expertise selections
- Timeline view shows career journey
- Exportable as PDF for external use (job applications, etc.)

### 4.2 Engagement Classification

**FR-010: Engagement Creation**
- Users can create engagements with type: Standing Commitment, Process Improvement, Strategic Initiative, or Cross-Functional Initiative
- Each engagement requires: title, description, capacity required, timeline, role definitions
- Engagement type determines verification workflow (auto-verify vs. manual)

**FR-011: Engagement Discovery**
- Filterable engagement board by type, status, capacity required
- Users can claim roles in engagements (subject to approval)
- Cross-functional initiatives show all roles and current assignments

**FR-012: Engagement Lifecycle**
- Status transitions: Draft → Active → In Review → Completed
- Completion triggers contribution verification workflow
- Overdue engagements trigger notifications

### 4.3 Capacity Management

**FR-020: Capacity Budget**
- Each user has weekly capacity budget (default: 100 units)
- Engagements allocate capacity when claimed
- Dashboard shows: Total, Allocated, Available, Recovery Bonus

**FR-021: Capacity Visibility**
- Before claiming engagement, user sees impact on capacity
- Over-allocation (>100%) triggers warning and requires manager approval
- Utilization history shows past 4 weeks

**FR-022: Recovery Period**
- After 48 hours without engagement activity, recovery bonus applies (+10 units)
- Weekend rest (Sat-Sun) triggers Monday recovery bonus
- Recovery bonus visible in capacity dashboard

### 4.4 Contribution Ledger

**FR-030: Contribution Submission**
- User submits contribution against an engagement
- Contribution includes: description, capacity invested, deliverables (links, files)
- System records timestamp and creates immutable chain entry

**FR-031: Contribution Verification**
- Verification workflow based on engagement type:
  - Standing Commitment: Manager verifies (auto-verify after 24h)
  - Process Improvement: Peer verifies (auto-verify after 72h)
  - Strategic Initiative: Leadership verifies (manual only)
  - Cross-Functional: Multi-party verifies (all role leads must verify)
- Verified contributions award contribution credits

**FR-032: Contribution History**
- User can view all contributions (verified and pending)
- Filterable by engagement type, date range, verification status
- Exportable as JSON/CSV for external use

### 4.5 Recognition Levels

**FR-040: Recognition Calculation**
- System automatically calculates recognition level based on:
  - Contributor: 5+ verified contributions
  - Steward: 20+ contributions + domain expertise
  - Principal: 50+ contributions + demonstrated leadership
- Level updates within 24 hours of threshold crossed

**FR-041: Recognition Visibility**
- Recognition level visible on user profile
- Level badges in communication channels (optional)
- Governance weight tied to level (future: voting power)

**FR-042: Recognition Progression**
- Progress bar shows progress to next level
- Milestone notifications at 5, 20, 50 contributions
- Recognition ceremony workflow (cultural track, not enforced by system)

---

## 5. Non-Functional Requirements

### 5.1 Performance

**NFR-001: Response Time**
- Dashboard load time: <2 seconds
- API response time (p95): <500ms
- Contribution verification: <1 second

**NFR-002: Scalability**
- Support 1,000 concurrent users (Phase 1)
- Support 10,000 concurrent users (Phase 3)
- Support 100 nodes in federation (Phase 3)

### 5.2 Security

**NFR-010: Authentication**
- Integrate with existing co-op.us authentication
- Support SSO for enterprise deployments (Phase 2)
- Session timeout: 24 hours

**NFR-011: Authorization**
- Role-based access control (Contributor, Steward, Principal)
- Data sovereignty: each node controls its own data
- Cross-node access requires explicit bridge covenant

**NFR-012: Data Protection**
- End-to-end encryption for cross-node communication
- Encryption at rest (AES-256)
- Access audit trail on immutable chain

### 5.3 Reliability

**NFR-020: Availability**
- Uptime SLA: 99.9% (Phase 1), 99.99% (Phase 3)
- Backup frequency: Daily
- Recovery time objective (RTO): 4 hours
- Recovery point objective (RPO): 1 hour

### 5.4 Usability

**NFR-030: Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility

**NFR-031: Internationalization**
- Support for multiple languages (Phase 2)
- Timezone-aware for distributed federation
- Date/time localization

---

## 6. Technical Architecture

### 6.1 System Components

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Profile   │  │  Capacity   │  │ Contribution│     │
│  │  Dashboard  │  │  Dashboard  │  │   Ledger    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Backend (Node.js)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Profile   │  │  Engagement │  │ Contribution│     │
│  │    Service  │  │   Service   │  │   Service   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
                            │ PostgreSQL
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Database (PostgreSQL)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Profiles  │  │ Engagements │  │Contributions│     │
│  │   Schema    │  │   Schema    │  │   Schema    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Data Model (Phase 1)

**Core Tables:**

```sql
-- Professional profiles
CREATE TABLE professional_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id),
  primary_function VARCHAR(50) NOT NULL,
  secondary_function VARCHAR(50) NOT NULL,
  profile_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(member_id, created_at)
);

-- Domain expertise
CREATE TABLE domain_expertise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES professional_profiles(id),
  expertise_path VARCHAR(100) NOT NULL,
  unlocked_at TIMESTAMP,
  active BOOLEAN DEFAULT true
);

-- Engagements
CREATE TABLE engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- standing, process_improvement, strategic, cross_functional
  title VARCHAR(200) NOT NULL,
  description TEXT,
  capacity_required INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  timeline_start DATE,
  timeline_end DATE,
  created_by UUID REFERENCES members(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contributions
CREATE TABLE contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES engagements(id),
  member_id UUID NOT NULL REFERENCES members(id),
  role VARCHAR(100),
  capacity_invested INTEGER NOT NULL,
  description TEXT,
  deliverables JSONB,
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES members(id),
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Capacity budgets
CREATE TABLE capacity_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id),
  cycle_start DATE NOT NULL,
  cycle_end DATE NOT NULL,
  total_capacity INTEGER NOT NULL DEFAULT 100,
  allocated_capacity INTEGER DEFAULT 0,
  recovery_bonus INTEGER DEFAULT 0,
  UNIQUE(member_id, cycle_start)
);

-- Recognition levels
CREATE TABLE recognition_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id),
  level VARCHAR(20) NOT NULL, -- contributor, steward, principal
  contribution_count INTEGER DEFAULT 0,
  last_calculated TIMESTAMP DEFAULT NOW(),
  UNIQUE(member_id)
);
```

### 6.3 API Endpoints (Phase 1)

**Professional Profiles:**
```
GET    /api/v1/profiles/:member_id
POST   /api/v1/profiles
PUT    /api/v1/profiles/:id
POST   /api/v1/profiles/:id/expertise
GET    /api/v1/profiles/:member_id/journey
```

**Engagements:**
```
GET    /api/v1/engagements
POST   /api/v1/engagements
GET    /api/v1/engagements/:id
PUT    /api/v1/engagements/:id
POST   /api/v1/engagements/:id/claim
POST   /api/v1/engagements/:id/complete
```

**Contributions:**
```
GET    /api/v1/contributions
POST   /api/v1/contributions
GET    /api/v1/contributions/:id
POST   /api/v1/contributions/:id/verify
GET    /api/v1/members/:member_id/contributions
```

**Capacity:**
```
GET    /api/v1/capacity/:member_id
POST   /api/v1/capacity/allocate
GET    /api/v1/capacity/utilization
```

**Recognition:**
```
GET    /api/v1/recognition/:member_id
POST   /api/v1/recognition/calculate
```

---

## 7. TIO Role Mapping

### 7.1 Pattern Stack Roles

| Layer | TIO Role | WoWc Responsibilities |
|-------|----------|----------------------|
| **Leadership** | Product Engineer | PRD ownership, stakeholder communication, roadmap prioritization |
| **Leadership** | Technical Lead | Architecture decisions, dependency management, build sequence |
| **Layer 1** | Schema Architect | Data model design, entity definitions, naming conventions |
| **Layer 2** | Backend Engineer | API implementation, database operations, migrations |
| **Layer 3** | Integration Engineer | Cross-context queries, co-op.us integration, authentication |
| **Layer 4** | Event Systems Engineer | Contribution events, verification workflows, notifications |
| **Layer 5** | Workflow Engineer | Engagement lifecycle, capacity allocation, recognition calculation |
| **Layer 6** | Compliance & Security | Access control, data sovereignty, audit trail |
| **Layer 7** | Frontend & DevOps | Dashboard UI, deployment, monitoring |
| **Cross-Cutting** | QA & Test Engineer | Test coverage, integration tests, load testing |

### 7.2 Sprint Allocation (Phase 1)

**Sprint 1-2: Foundation (Schema + Backend)**
- Schema Architect: Data model finalization
- Backend Engineer: Database setup, migrations
- Technical Lead: Architecture review

**Sprint 3-4: API Layer**
- Backend Engineer: Core API endpoints
- Integration Engineer: Authentication integration
- QA Engineer: Unit tests

**Sprint 5-6: Frontend Dashboard**
- Frontend Engineer: Profile, Capacity, Engagement dashboards
- Integration Engineer: API integration
- QA Engineer: Integration tests

**Sprint 7-8: Contribution & Verification**
- Workflow Engineer: Verification workflows
- Backend Engineer: Contribution API
- Compliance Engineer: Access control

**Sprint 9-10: Recognition & Polish**
- Workflow Engineer: Recognition calculation
- Frontend Engineer: Recognition UI
- QA Engineer: Load testing, bug fixes

---

## 8. Success Metrics

### 8.1 Adoption Metrics

- **MAU (Monthly Active Users):** 100+ by end of Phase 1
- **Profile Completion Rate:** 80% of users have professional profile
- **Engagement Creation:** 50+ engagements created in Phase 1
- **Contribution Verification Rate:** 90% verified within 72 hours

### 8.2 Quality Metrics

- **System Uptime:** 99.9%+ in Phase 1
- **API Response Time (p95):** <500ms
- **Bug Escape Rate:** <5% of bugs found in production
- **User Satisfaction (NPS):** 50+ by end of Phase 1

### 8.3 Impact Metrics

- **Capacity Over-allocation:** Reduced by 50% (baseline: TBD)
- **Cross-Functional Initiatives:** 10+ completed in Phase 1
- **Recognition Progression:** 20% of users advance one level in Phase 1
- **Burnout Indicators:** Reduced reported burnout (survey-based)

---

## 9. Risks & Mitigations

### 9.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Schema design doesn't support federation | High | Medium | Design with multi-node from start; review with Technical Lead |
| Performance degrades with scale | High | Medium | Load testing in Sprint 10; indexing strategy |
| Integration with co-op.us fails | High | Low | Early integration in Sprint 3; fallback plan |

### 9.2 Organizational Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low adoption (users don't create profiles) | High | Medium | Onboarding flow; executive sponsorship; show value early |
| Verification bottleneck (contributions pile up) | Medium | High | Auto-verification for low-risk contributions; multiple verifiers |
| Capacity limits feel restrictive | Medium | Medium | Education on burnout prevention; adjustable budgets |

### 9.3 Cultural Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Perceived as "surveillance tool" | High | Medium | Emphasize user control; transparency; cultural track framing |
| Gaming the system (fake contributions) | High | Low | Peer verification; reputation at stake; audit trail |
| Loss of cultural identity (too corporate) | Medium | Medium | Maintain culture track; separate enterprise/cultural docs |

---

## 10. Go-to-Market Strategy

### 10.1 Internal Launch (Techne Studio)

**Week 1-2: Soft Launch**
- Onboard Techne organizers as beta testers
- Create professional profiles for all 8 organizers
- Test engagement creation and contribution verification

**Week 3-4: Feedback Iteration**
- Gather feedback on UX, workflow, vocabulary
- Iterate based on feedback
- Fix critical bugs

**Week 5-6: Full Launch**
- All Techne members onboarded
- All work tracked as engagements
- First recognition level calculations

### 10.2 External Launch (Federation)

**Month 4: Second Node**
- Onboard second hub (e.g., Nairobi)
- Establish first bridge covenant
- Test cross-node contribution tracking

**Month 6: Practice Communities**
- Launch first practice community (Code Practitioners)
- Elect community officers
- Hold first community summit

**Month 9+: Federation Scale**
- 5+ nodes operating
- Federation Council established
- Economic infrastructure launched

---

## 11. Appendix

### 11.1 Glossary

| Term | Definition |
|------|-----------|
| **Engagement** | A unit of work with clear scope and deliverables |
| **Professional Profile** | Combination of primary + secondary function (64 unique profiles) |
| **Domain Expertise** | Specialized way of practicing a professional profile |
| **Recognition Level** | Community acknowledgment (Contributor, Steward, Principal) |
| **Capacity Budget** | Available resources (time, compute, attention) per cycle |
| **Contribution Ledger** | Immutable record of verified work |
| **Node** | Autonomous operating unit within a federation |
| **Bridge** | Bilateral coordination channel between two nodes |
| **Practice Community** | Global professional community organized by function |

### 11.2 References

- [Workcraft Coordination Framework](./docs/enterprise/WORKCRAFT_COORDINATION_FRAMEWORK.md)
- [HR Career Framework Mapping](./docs/enterprise/HR_CAREER_MAPPING.md)
- [TIO Role Artifacts](../tio/roles/)
- [co-op.us Repository](https://github.com/Roots-Trust-LCA/co-op.us)

### 11.3 Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-22 | Product Engineer | Initial PRD draft |

---

*PRD — World of Workcraft v1.0*  
*Technology and Information Office (TIO) — Techne Studio*
