# JobHunt-AI: UI Architecture

## 1. Design Principles

- **Local-first**: Runs entirely on the user's machine, no cloud services
- **Progressive disclosure**: Dashboard shows overview, click to drill into details
- **AI-augmented**: AI powers matching; UI stays simple and responsive
- **Human-in-the-loop**: System recommends, user decides. Never auto-submits.

## 2. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | React 18 + Vite | Fast HMR, simple SPA, no SSR needed |
| Styling | Tailwind CSS v3 | Utility-first, rapid iteration |
| Icons | Lucide React | Clean, consistent icon set |
| State | React Context + useReducer | No external state lib needed for single-user app |
| HTTP | Fetch API (frontend) + Express (backend) | Minimal dependencies |
| Bundling | Vite | <1s HMR, native ESM |

## 3. Component Tree

```
<App>
  ├── <Header>
  │   ├── Logo + "JobHunt AI"
  │   └── UserBadge (name, avatar initial)
  │
  ├── <Dashboard>
  │   └── <StatsBar>
  │       ├── StatCard (Total Jobs)
  │       ├── StatCard (Matched >80%)
  │       └── StatCard (Applied)
  │
  ├── <ScanPanel>
  │   ├── <ScanConfig> (modal)
  │   │   ├── RoleInput (multi-select tags)
  │   │   ├── LocationInput
  │   │   ├── SourceCheckboxes (LinkedIn, Naukri, Custom)
  │   │   └── ScanButton
  │   └── <ScanProgress> (animated during scan)
  │       ├── ProgressBar
  │       └── StatusLog (real-time log lines)
  │
  ├── <JobBrowser>
  │   ├── <FilterBar>
  │   │   ├── SearchInput
  │   │   ├── StatusFilter (dropdown)
  │   │   ├── SourceFilter (dropdown)
  │   │   ├── SortSelect
  │   │   └── ViewToggle (list/compact)
  │   │
  │   └── <JobList>
  │       └── <JobCard>[] (virtualized for 100+ items)
  │           ├── CompanyLogo
  │           ├── RoleInfo (title, company, location)
  │           ├── MatchBadge (color-coded: green >80%, yellow >60%, red <60%)
  │           ├── SalaryTag (if available)
  │           ├── SourceIcon (LIn/Naukri/Web)
  │           └── DatePosted
  │
  ├── <JobDetail> (right panel or full page on mobile)
  │   ├── JobHeader (title, company, location, salary)
  │   ├── <MatchBreakdown>
  │   │   ├── OverallScore (large gauge)
  │   │   ├── DimensionBar (Skills: 95%)
  │   │   ├── DimensionBar (Experience: 88%)
  │   │   ├── DimensionBar (Role Fit: 82%)
  │   │   ├── DimensionBar (Location/Comp: 70%)
  │   │   └── DimensionBar (Growth Signal: 65%)
  │   ├── JobDescription (rendered markdown)
  │   ├── <KeyGaps> (AI-identified missing keywords/skills)
  │   └── <ActionBar>
  │       ├── [📄 Generate Tailored CV]
  │       ├── [🚀 Apply on Portal]
  │       └── [📌 Save / ❌ Discard / 📋 Interview Prep]
  │
  └── <SidePanel> (collapsible, contextual)
      ├── RecentActivity (last 10 actions)
      ├── UpcomingInterviews
      └── Tips (AI-generated suggestions)
```

## 4. Route Design (SPA with hash-based routing)

| Route | Component | Description |
|-------|-----------|-------------|
| `#/` | Dashboard | Stats + scan trigger + job list |
| `#/jobs` | JobList | Full job browser with all filters |
| `#/jobs/:id` | JobDetail | Single job view with match + actions |
| `#/applied` | JobList (filtered) | Only applied/saved jobs |
| `#/settings` | SettingsPanel | cv.md refresh, API config, sources |

## 5. State Management

### Context Shape

```js
{
  // Scan state
  scan: {
    status: 'idle' | 'scanning' | 'done' | 'error',
    progress: { current: 12, total: 50, sources: [...] },
    lastScanned: '2026-07-08T10:30:00Z'
  },

  // Job data (loaded from API)
  jobs: {
    items: Map<id, Job>,
    filters: { status: 'all', source: 'all', search: '', sort: '-score' },
    selectedId: null
  },

  // Matching
  match: {
    cache: Map<jobId, MatchResult>,
    pending: Set<jobId>
  },

  // User profile
  profile: {
    name: 'Ninad Gokhale',
    targetRoles: ['Senior AI Engineer', 'Senior ML Engineer'],
    locations: ['Pune', 'Remote'],
    salaryRange: { min: 22, max: 30 }
  }
}
```

### Data Flow (Redux-like reducer)

```
[User Action] → dispatch({ type, payload }) → reducer → new state → React re-render
```

### API Communication

```
React Component → fetch(/api/...) → Express Route → SQLite → JSON Response → setState
```

## 6. Match Score Color Scheme

| Score Range | Color | Label |
|-------------|-------|-------|
| 85-100 | Green (#22c55e) | Strong Match |
| 70-84 | Lime (#84cc16) | Good Match |
| 50-69 | Yellow (#eab308) | Consider |
| 30-49 | Orange (#f97316) | Weak Match |
| 0-29 | Red (#ef4444) | Skip |

## 7. Mobile Responsiveness

- Single column layout below 768px
- JobDetail becomes a full-screen slide-in panel
- FilterBar collapses into a bottom sheet on mobile
- StatsBar stacks vertically
- Touch-friendly targets (min 44px)

## 8. Accessibility

- All interactive elements keyboard-navigable
- Match scores announced via aria-live
- Color is never the only indicator (score number + label always visible)
- Focus trap in modals (ScanConfig)
- Dark mode support via Tailwind `dark:` prefix

## 9. Performance Targets

| Metric | Target |
|--------|--------|
| Initial load (LCP) | <1.5s |
| Job list render (100 items) | <200ms |
| Job detail navigation | <100ms |
| Match score display (cached) | <50ms |
| Bundle size (gzipped) | <100KB |
