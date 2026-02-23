# Workcraft Repo Gap Analysis & Enhancement Plan (2026-02-23)

**Context:** Full repo review post-TIO v2.0 alignment (15 roles/RACI, Econ> Fed phasing). Identifies gaps/conflicts/opportunities.

## 1. Gaps (Missing/Underdeveloped)

| Area | Gap | Impact | Fix |
|------|-----|--------|-----|
| **Phasing Consistency** | Legacy docs (WORLD_OF_WORKCRAFT*.md, enterprise) reference old Fed-before-Econ; no Phase 2/3 updates. | Roadmap confusion. | Global search/replace; phase summaries in README. |
| **TIO Integration** | Product docs TIO-linked; core/enterprise/culture lack roles/RACI/procs refs. | Siloed execution. | Add TIO section to all READMEs; RACI embed. |
| **Templates** | Bridge covenants, royalty specs, guild charters mentioned but no files. | Slow federation. | docs/templates/ dir w/ Markdown templates. |
| **Visuals/Mockups** | Dashboards/recognition mentioned; no wireframes/Mermaid. | Hard stakeholder buy-in. | product/mockups/ w/ Figma/Mermaid. |
| **Metrics Spec** | PRD/ROADMAP metrics; no EPIC for dashboards (QATE-led). | Unmeasurable success. | EPIC-025: Metrics Engine. |
| **Build/Deploy** | No CI/CD; manual npm run build. | Demo lags code. | GitHub Actions on push → Pages. |
| **Exit/Covenant** | Federation exits theoretical; no templates. | Risky scaling. | templates/BRIDGE_COVENANT.md. |

## 2. Conflicts (Inconsistent Info)

| Doc | Conflict | Resolution |
|-----|----------|------------|
| WORLD_OF_WORKCRAFT.md | Gaming metaphors (XP, levels) vs. professional (enterprise track). | Dual tracks clear in README; enterprise prioritizes. |
| SPRINT_QUEUE.md | Q1 "Planning"; no assignee logs. | Add "Progress" column; TL weekly updates. |
| PRD_v1.md | NFR scalability 10k users; no load test plan. | Q9 QATE expanded. |
| README.md | Links to superseded docs (PROFESSIONAL_REFRAME). | Prune; point to enterprise index. |
| Live Demo | Static; misses Phase 2/3 mocks. | Add Phase 2/3 prototypes. |

## 3. Opportunities (Enhancements)

| Opportunity | Benefit | Effort | Priority |
|-------------|---------|--------|----------|
| **Master Index** | README → interactive doc tree (Mermaid). | Low | P0 |
| **TIO Playbook** | product/TIO-PLAYBOOK.md (roles/RACI for WoWc). | Med | P0 |
| **Monetization Spec** | docs/econ/ROYALTY_SPEC.md (Phase 2 deep-dive). | Med | P1 |
| **Guild Templates** | culture/GUILD_CHARTER.md. | Low | P1 |
| **Actions CI/CD** | .github/workflows/deploy.yml. | Low | P1 |
| **Mockups Dir** | product/mockups/ w/ Figma embeds. | Med | P2 |
| **Audit Log** | SPRINT_QUEUE progress tracker. | Low | P2 |

## Action Plan (TIO-Style Sprint)

**Sprint Q11: Repo Audit**
- PRD/ROADMAP owners: PE/TL.
- Update legacy phasing (SA/TCW).
- Templates dir (VA).
- CI/CD (FD).

**Commit Post-Action:** All fixes pushed.

*Repo maturity → production-ready; TIO alignment complete.*
