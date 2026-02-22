# Workcraft Sprint Queue

**Product:** World of Workcraft  
**Sprint Cadence:** 2-week sprints  
**Current Sprint:** Sprint 1 (Planning)  
**Product Owner:** Product Engineer (TIO)  
**Technical Lead:** [TBD]

---

## Sprint Queue

| Queue # | Sprint | Focus | TIO Role | Status | Start Date | End Date |
|---------|--------|-------|----------|--------|------------|----------|
| Q1 | Sprint 1 | Schema Design + DB Setup | Schema Architect | 🟡 Planning | 2026-02-24 | 2026-03-09 |
| Q2 | Sprint 2 | Core API Endpoints | Backend Engineer | ⚪ Backlog | 2026-03-10 | 2026-03-23 |
| Q3 | Sprint 3 | Authentication Integration | Integration Engineer | ⚪ Backlog | 2026-03-24 | 2026-04-06 |
| Q4 | Sprint 4 | Profile Dashboard UI | Frontend Engineer | ⚪ Backlog | 2026-04-07 | 2026-04-20 |
| Q5 | Sprint 5 | Engagement Board UI | Frontend Engineer | ⚪ Backlog | 2026-04-21 | 2026-05-04 |
| Q6 | Sprint 6 | Capacity Dashboard | Frontend Engineer | ⚪ Backlog | 2026-05-05 | 2026-05-18 |
| Q7 | Sprint 7 | Contribution Verification | Workflow Engineer | ⚪ Backlog | 2026-05-19 | 2026-06-01 |
| Q8 | Sprint 8 | Recognition System | Workflow Engineer | ⚪ Backlog | 2026-06-02 | 2026-06-15 |
| Q9 | Sprint 9 | Load Testing + Polish | QA Engineer | ⚪ Backlog | 2026-06-16 | 2026-06-29 |
| Q10 | Sprint 10 | Phase 1 Launch | All Roles | ⚪ Backlog | 2026-06-30 | 2026-07-13 |

---

## Sprint 1: Schema Design + DB Setup

**Dates:** February 24 - March 9, 2026 (2 weeks)  
**TIO Lead:** Schema Architect  
**Supporting Roles:** Backend Engineer, Technical Lead

### Objectives
1. Finalize data model for all Phase 1 epics
2. Create PostgreSQL schemas and migrations
3. Document entity relationships and naming conventions
4. Technical Lead architecture review

### User Stories

**PROF-001: Professional Profile Schema**
- [ ] Create `professional_profiles` table
- [ ] Create `domain_expertise` table
- [ ] Define primary/secondary function enums
- [ ] Add foreign key to members table
- [ ] Create indexes for common queries

**ENG-001: Engagement Schema**
- [ ] Create `engagements` table
- [ ] Define engagement type enum
- [ ] Create `engagement_roles` table
- [ ] Add timeline columns (start, end)
- [ ] Create indexes for status/type filters

**CONT-001: Contribution Schema**
- [ ] Create `contributions` table
- [ ] Add verification workflow columns
- [ ] Create `contribution_verifications` table
- [ ] Add deliverables JSONB column
- [ ] Create indexes for member/engagement queries

**CAP-001: Capacity Schema**
- [ ] Create `capacity_budgets` table
- [ ] Create `capacity_allocations` table
- [ ] Add recovery bonus tracking
- [ ] Create indexes for cycle queries

**REC-001: Recognition Schema**
- [ ] Create `recognition_levels` table
- [ ] Add contribution count tracking
- [ ] Create `recognition_history` table
- [ ] Create indexes for level queries

### Deliverables
- [ ] ER diagrams (Mermaid) for all schemas
- [ ] DDL migration files (numbered, reversible)
- [ ] Data dictionary (all tables, columns, types)
- [ ] Naming convention document
- [ ] Technical Lead sign-off

### Acceptance Criteria
- [ ] All DDL files execute without errors
- [ ] ER diagrams match deployed schema (no drift)
- [ ] Data dictionary covers 100% of tables/columns
- [ ] Naming conventions consistent throughout
- [ ] Indexes defined for all foreign keys and common queries
- [ ] Technical Lead review completed

### Sprint Ceremonies
- **Sprint Planning:** Feb 24, 10:00 AM MT (1 hour)
- **Daily Standup:** Async in Telegram channel (by 10:00 AM MT)
- **Mid-Sprint Review:** March 3, 2:00 PM MT (30 min)
- **Sprint Review:** March 9, 2:00 PM MT (1 hour)
- **Retrospective:** March 9, 3:00 PM MT (30 min)

### Capacity Allocation
| Role | Allocation (hours) | Team Member |
|------|-------------------|-------------|
| Schema Architect | 60 | [TBD] |
| Backend Engineer | 20 | [TBD] |
| Technical Lead | 10 | [TBD] |

### Risks & Blockers
- [ ] PostgreSQL version compatibility (verify co-op.us stack)
- [ ] Member table schema alignment (review co-op.us schema)
- [ ] Naming convention conflicts with existing conventions

---

## Sprint 2: Core API Endpoints

**Dates:** March 10 - March 23, 2026  
**TIO Lead:** Backend Engineer  
**Supporting Roles:** Schema Architect, QA Engineer

### Objectives
1. Implement REST API for all Phase 1 entities
2. Add input validation and error handling
3. Write unit tests (80%+ coverage)
4. API documentation (OpenAPI/Swagger)

### User Stories

**Profile API:**
- [ ] `GET /api/v1/profiles/:member_id`
- [ ] `POST /api/v1/profiles`
- [ ] `PUT /api/v1/profiles/:id`
- [ ] `POST /api/v1/profiles/:id/expertise`

**Engagement API:**
- [ ] `GET /api/v1/engagements` (filterable)
- [ ] `POST /api/v1/engagements`
- [ ] `GET /api/v1/engagements/:id`
- [ ] `PUT /api/v1/engagements/:id`
- [ ] `POST /api/v1/engagements/:id/claim`

**Contribution API:**
- [ ] `GET /api/v1/contributions` (filterable)
- [ ] `POST /api/v1/contributions`
- [ ] `POST /api/v1/contributions/:id/verify`
- [ ] `GET /api/v1/members/:member_id/contributions`

**Capacity API:**
- [ ] `GET /api/v1/capacity/:member_id`
- [ ] `POST /api/v1/capacity/allocate`
- [ ] `GET /api/v1/capacity/utilization`

**Recognition API:**
- [ ] `GET /api/v1/recognition/:member_id`
- [ ] `POST /api/v1/recognition/calculate`

### Deliverables
- [ ] All API endpoints implemented
- [ ] Input validation on all endpoints
- [ ] Error handling (standard error responses)
- [ ] Unit tests (80%+ coverage)
- [ ] OpenAPI/Swagger documentation
- [ ] Postman collection for testing

### Acceptance Criteria
- [ ] All endpoints return correct status codes
- [ ] Input validation rejects invalid data
- [ ] Error messages are clear and actionable
- [ ] Unit tests pass (CI/CD pipeline)
- [ ] API documentation is complete and accurate
- [ ] Postman collection tested against all endpoints

### Sprint Ceremonies
- **Sprint Planning:** March 10, 10:00 AM MT
- **Daily Standup:** Async (by 10:00 AM MT)
- **Mid-Sprint Review:** March 17, 2:00 PM MT
- **Sprint Review:** March 23, 2:00 PM MT
- **Retrospective:** March 23, 3:00 PM MT

### Capacity Allocation
| Role | Allocation (hours) | Team Member |
|------|-------------------|-------------|
| Backend Engineer | 60 | [TBD] |
| Schema Architect | 10 | [TBD] |
| QA Engineer | 20 | [TBD] |

---

## Sprint 3: Authentication Integration

**Dates:** March 24 - April 6, 2026  
**TIO Lead:** Integration Engineer  
**Supporting Roles:** Backend Engineer, Security Engineer

### Objectives
1. Integrate with co-op.us authentication system
2. Implement role-based access control
3. Add audit logging for sensitive operations
4. Security review

### User Stories

**AUTH-001: Authentication Integration**
- [ ] OAuth2/JWT integration with co-op.us
- [ ] Session management (24h timeout)
- [ ] Token refresh mechanism
- [ ] Logout flow

**AUTH-002: Authorization (RBAC)**
- [ ] Role-based access control (Contributor/Steward/Principal)
- [ ] Endpoint-level permissions
- [ ] Data sovereignty (node-level access control)
- [ ] Cross-node access via bridge covenant

**AUTH-003: Audit Logging**
- [ ] Log all authentication events
- [ ] Log all authorization failures
- [ ] Log sensitive operations (verification, level changes)
- [ ] Audit trail query API

### Deliverables
- [ ] Authentication integration complete
- [ ] RBAC implemented on all endpoints
- [ ] Audit logging functional
- [ ] Security review completed
- [ ] Penetration testing (basic)

### Acceptance Criteria
- [ ] Users can log in with co-op.us credentials
- [ ] Session timeout enforced (24h)
- [ ] RBAC prevents unauthorized access
- [ ] Audit logs capture all required events
- [ ] Security review passes with no critical issues

### Capacity Allocation
| Role | Allocation (hours) | Team Member |
|------|-------------------|-------------|
| Integration Engineer | 60 | [TBD] |
| Backend Engineer | 20 | [TBD] |
| Compliance & Security | 20 | [TBD] |

---

## Future Sprints (Summaries)

### Sprint 4: Profile Dashboard UI
**Focus:** Professional profile creation, expertise selection, journey timeline  
**TIO Lead:** Frontend Engineer  
**Key Deliverables:** Profile creation flow, expertise selector, journey timeline view

### Sprint 5: Engagement Board UI
**Focus:** Engagement discovery, claiming, lifecycle management  
**TIO Lead:** Frontend Engineer  
**Key Deliverables:** Engagement board with filters, claim flow, status transitions

### Sprint 6: Capacity Dashboard
**Focus:** Capacity visibility, allocation tracking, recovery bonus  
**TIO Lead:** Frontend Engineer  
**Key Deliverables:** Capacity dashboard, utilization charts, over-allocation warnings

### Sprint 7: Contribution Verification
**Focus:** Contribution submission, verification workflows, auto-verification  
**TIO Lead:** Workflow Engineer  
**Key Deliverables:** Contribution form, verification UI, auto-verification logic

### Sprint 8: Recognition System
**Focus:** Recognition calculation, level visibility, milestone notifications  
**TIO Lead:** Workflow Engineer  
**Key Deliverables:** Recognition calculation engine, level badges, notifications

### Sprint 9: Load Testing + Polish
**Focus:** Performance optimization, bug fixes, UX polish  
**TIO Lead:** QA Engineer  
**Key Deliverables:** Load test results, bug fixes, UX improvements

### Sprint 10: Phase 1 Launch
**Focus:** Production deployment, onboarding, monitoring  
**TIO Lead:** All Roles  
**Key Deliverables:** Production deployment, onboarding flow, monitoring dashboards

---

## Sprint Ceremonies Template

### Sprint Planning (2 hours)
**Attendees:** Product Engineer, Technical Lead, All TIO Roles for sprint  
**Agenda:**
1. Review sprint goals (15 min)
2. Walk through user stories (45 min)
3. Capacity allocation (30 min)
4. Risk identification (30 min)

### Daily Standup (Async)
**Channel:** Telegram #workcraft-standup  
**Format:**
```
Yesterday: [What I did]
Today: [What I'm doing]
Blockers: [Any blockers]
```

### Sprint Review (1 hour)
**Attendees:** Product Engineer, Technical Lead, Stakeholders  
**Agenda:**
1. Demo completed work (30 min)
2. Review metrics (15 min)
3. Stakeholder feedback (15 min)

### Retrospective (30 min)
**Attendees:** All sprint participants  
**Agenda:**
1. What went well? (10 min)
2. What could be improved? (10 min)
3. Action items for next sprint (10 min)

---

## Definition of Done

**For User Stories:**
- [ ] Code implemented and tested
- [ ] Unit tests passing
- [ ] Code reviewed by peer
- [ ] Documentation updated
- [ ] Deployed to staging environment

**For Sprints:**
- [ ] All sprint deliverables complete
- [ ] Sprint review held with stakeholders
- [ ] Retrospective completed with action items
- [ ] Sprint report published

**For Releases:**
- [ ] All epics in release complete
- [ ] Load testing passed
- [ ] Security review passed
- [ ] Production deployment successful
- [ ] Monitoring dashboards operational

---

*Workcraft Sprint Queue v1.0*  
*Technology and Information Office (TIO) — Techne Studio*
