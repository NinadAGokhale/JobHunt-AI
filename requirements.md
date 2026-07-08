# JobHunt-AI: Requirements Document

## 1. Overview

JobHunt-AI is a local-first, AI-powered job search assistant. It scans job portals (LinkedIn, Naukri, company career pages), matches openings against your resume using AI, and lets you apply with one click. Built for a single user (Ninad Gokhale — Senior AI Engineer targeting roles in Pune/Remote at ₹22-30L+).

## 2. Visual Identity

### 2.1 Color Palette

Inspired by local-ai-system (orange accent on dark) + Opencode (emerald accent on dark).

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#10b981` (emerald-500) | Primary buttons, active tabs, links |
| `--accent-hover` | `#059669` (emerald-600) | Button hover |
| `--accent-text` | `#34d399` (emerald-400) | Highlights, badges |
| `--bg` | `#030712` (gray-950) | Page background |
| `--surface` | `#111827` (gray-900) | Cards, sidebars, modals |
| `--surface-2` | `#1f2937` (gray-800) | Inputs, secondary surfaces |
| `--surface-3` | `#374151` (gray-700) | Hover states, tertiary |
| `--border` | `#1f2937` (gray-800) | Borders, dividers |
| `--text` | `#f3f4f6` (gray-100) | Primary text |
| `--text-dim` | `#9ca3af` (gray-400) | Secondary text |
| `--text-muted` | `#6b7280` (gray-500) | Placeholder, disabled |
| `--danger` | `#ef4444` (red-500) | Errors, delete, discard |
| `--warning` | `#f59e0b` (amber-500) | Warnings |
| `--info` | `#3b82f6` (blue-500) | Info, external links |

### 2.2 Match Score Colors

| Range | Color | Hex | Label |
|-------|-------|-----|-------|
| 85-100 | Green | `#22c55e` | Strong Match |
| 70-84 | Lime | `#84cc16` | Good Match |
| 50-69 | Yellow | `#eab308` | Consider |
| 30-49 | Orange | `#f97316` | Weak Match |
| 0-29 | Red | `#ef4444` | Skip |

### 2.3 Typography

- Font: `Inter`, system-ui fallback
- Headings: Bold (700), tighter letter-spacing
- Body: Normal (400), 14px base
- Monospace: for code blocks in job descriptions
- Match scores: Bold, large (badge-style)

### 2.4 Dark Theme Default

The app is dark-first. No light theme in v1.

## 3. UI Layout

### 3.1 Page Structure

```
+--------------------------------------------------+
| HEADER                                            |
| [JobHunt AI logo]              [User Badge]       |
+--------------------------------------------------+
| STATS BAR                                         |
| [Total: 42]  [Matched >80%: 18]  [Applied: 7]    |
+--------------------------------------------------+
| FILTER BAR                                        |
| [Search...] [Status ▼] [Source ▼] [Sort ▼] [≡]  |
+--------------------------------------------------+
| MAIN AREA (split layout)                          |
| +---------------------------+ +----------------+  |
| | JOB LIST                  | | SIDE PANEL     |  |
| | [JobCard]                 | | Recent Activity |  |
| | [JobCard]  ▶ click → opens| | Upcoming Int.   |  |
| | [JobCard]  JobDetail view | | Tips            |  |
| | [JobCard]                 | +----------------+  |
| +---------------------------+                     |
+--------------------------------------------------+
```

### 3.2 Routes (Hash-based SPA)

| Hash | View | Description |
|------|------|-------------|
| `#/` | Dashboard | Stats + job list + filters |
| `#/jobs/:id` | JobDetail | Single job with match + actions |
| `#/applied` | Filtered | Only applied/saved jobs |
| `#/settings` | Settings | cv.md refresh, API config |

### 3.3 Responsive Behavior

- **≥1024px**: Two-column (job list + side panel), JobDetail as full view
- **768-1023px**: Single column, JobDetail as slide-in panel
- **<768px**: Single column, FilterBar as bottom sheet, JobDetail full-screen

## 4. Functional Requirements

### 4.1 Job Scanning

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | User can trigger a scan by specifying target roles, locations, and job sources | P0 |
| FR-02 | System scans LinkedIn, Naukri, and configurable company career pages via Playwright | P0 |
| FR-03 | Jobs are deduplicated across sources (same company + role = one entry) | P0 |
| FR-04 | User can see scan progress in real-time (jobs found, sources searched, status log) | P1 |
| FR-05 | System supports incremental scans (only new/updated jobs since last scan) | P2 |

### 4.2 Job Browsing

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-06 | Dashboard shows stats bar: total job count, matched count (>80%), applied count | P0 |
| FR-07 | Jobs displayed in a sortable, filterable list (by source, match score, date, location, status) | P0 |
| FR-08 | Each job card shows: title, company, location, salary, match score, source, posted date | P0 |
| FR-09 | User can click any job to see full detail view | P0 |
| FR-10 | Filters persist across sessions (stored in localStorage) | P2 |
| FR-11 | Search filters jobs by title/company keywords | P1 |
| FR-12 | View toggle between list and compact card mode | P2 |

### 4.3 AI Job Matching

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-13 | System computes a match score (0-100) between the job description and user's cv.md | P0 |
| FR-14 | Match score breaks down into: Skills Match (35%), Experience Level (25%), Role Fit (20%), Location/Comp (10%), Growth Signal (10%) | P0 |
| FR-15 | Scoring uses AI (Claude/LLM) to understand context, not just keyword matching | P0 |
| FR-16 | Cached match scores — re-scored only when cv.md changes or on explicit refresh | P1 |

### 4.4 Application Flow

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-17 | "Apply" button generates a tailored CV PDF customized to the job description | P0 |
| FR-18 | "Apply" opens the company's career portal in the default browser at the application page | P0 |
| FR-19 | System tracks application status: Discovered → Applied → Interview → Offer/Rejected | P0 |
| FR-20 | User can manually update status and add notes | P1 |

### 4.5 Side Panel

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-21 | Side panel shows recent activity (last 10 actions with timestamps) | P1 |
| FR-22 | Side panel shows upcoming interviews with dates | P1 |
| FR-23 | Side panel shows AI-generated tips/suggestions | P2 |

### 4.6 Data & State

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-24 | All data stored locally in SQLite — no cloud dependency | P0 |
| FR-25 | User's cv.md is the canonical source of truth for matching | P0 |
| FR-26 | Export job data as JSON/CSV | P2 |

## 5. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Scan completes within 5 minutes for standard sources | 5 min |
| NFR-02 | Match score computed within 30 seconds per job | 30s |
| NFR-03 | UI responds within 200ms for browsing | 200ms |
| NFR-04 | Zero cloud dependency — all data stays on local machine | — |
| NFR-05 | Single `npm run dev` command starts both frontend and backend | — |
| NFR-06 | Initial load (LCP) <1.5s | 1.5s |
| NFR-07 | Bundle size (gzipped) <100KB | 100KB |

## 6. User Stories

### US-01: First Scan
"As a user, I want to configure my target roles and locations once, then trigger a scan to discover all matching jobs across LinkedIn and Naukri."

### US-02: Assess Fit
"As a user, I want to click on any job and see an AI-powered match score with a breakdown so I know whether it's worth my time."

### US-03: Apply with Context
"As a user, I want to click 'Apply' and have the system generate a tailored CV for that specific role and open the company's portal."

### US-04: Track Progress
"As a user, I want to see which jobs I've applied to, which ones responded, and where I am in the pipeline."

## 7. Out of Scope (v1)

- Multi-user support
- Cloud sync / team collaboration
- Auto-apply (system never submits without user review)
- Mobile app
- Integration with ATS systems (Workday, Greenhouse API)
- Salary negotiation tools
- Light theme
