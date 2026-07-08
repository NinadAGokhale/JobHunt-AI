# JobHunt-AI: Requirements Document

## 1. Overview

JobHunt-AI is a local-first, AI-powered job search assistant. It scans job portals (LinkedIn, Naukri, company career pages), matches openings against your resume using AI, and lets you apply with one click. Built for a single user (Ninad Gokhale — Senior AI Engineer targeting roles in Pune/Remote at ₹22-30L+).

## 2. Functional Requirements

### 2.1 Job Scanning

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | User can trigger a scan by specifying target roles, locations, and job sources | P0 |
| FR-02 | System scans LinkedIn, Naukri, and configurable company career pages via Playwright | P0 |
| FR-03 | Jobs are deduplicated across sources (same company + role = one entry) | P0 |
| FR-04 | User can see scan progress in real-time (jobs found, sources searched) | P1 |
| FR-05 | System supports incremental scans (only new/updated jobs since last scan) | P2 |

### 2.2 Job Browsing

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-06 | Dashboard shows job count, matched count (>80%), applied count | P0 |
| FR-07 | Jobs displayed in a sortable, filterable list (by source, match score, date, location) | P0 |
| FR-08 | Each job card shows: title, company, location, salary, match score, source, posted date | P0 |
| FR-09 | User can click any job to see full details | P0 |
| FR-10 | Filters persist across sessions (stored locally) | P2 |

### 2.3 AI Job Matching

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-11 | System computes a match score (0-100) between the job description and user's cv.md | P0 |
| FR-12 | Match score breaks down into: Skills Match (35%), Experience Level (25%), Role Fit (20%), Location/Comp (10%), Growth Signal (10%) | P0 |
| FR-13 | Scoring uses AI (Claude/LLM) to understand context, not just keyword matching | P0 |
| FR-14 | Cached match scores — re-scored only when cv.md changes or on explicit refresh | P1 |

### 2.4 Application Flow

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-15 | "Apply" button generates a tailored CV PDF customized to the job description | P0 |
| FR-16 | "Apply" opens the company's career portal in the default browser at the application page | P0 |
| FR-17 | System tracks application status: Discovered → Applied → Interview → Offer/Rejected | P0 |
| FR-18 | User can manually update status and add notes | P1 |

### 2.5 Data & State

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-19 | All data stored locally in SQLite — no cloud dependency | P0 |
| FR-20 | User's cv.md is the canonical source of truth for matching | P0 |
| FR-21 | Export job data as JSON/CSV | P2 |

## 3. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Scan completes within 5 minutes for standard sources | 5 min |
| NFR-02 | Match score computed within 30 seconds per job | 30s |
| NFR-03 | UI responds within 200ms for browsing | 200ms |
| NFR-04 | Zero cloud dependency — all data stays on local machine | — |
| NFR-05 | Single `npm run dev` command starts both frontend and backend | — |

## 4. User Stories

### US-01: First Scan
"As a user, I want to configure my target roles and locations once, then trigger a scan to discover all matching jobs across LinkedIn and Naukri."

### US-02: Assess Fit
"As a user, I want to click on any job and see an AI-powered match score with a breakdown so I know whether it's worth my time."

### US-03: Apply with Context
"As a user, I want to click 'Apply' and have the system generate a tailored CV for that specific role and open the company's portal."

### US-04: Track Progress
"As a user, I want to see which jobs I've applied to, which ones responded, and where I am in the pipeline."

## 5. Out of Scope (v1)

- Multi-user support
- Cloud sync / team collaboration
- Auto-apply (system never submits without user review)
- Mobile app
- Integration with ATS systems (Workday, Greenhouse API)
- Salary negotiation tools
