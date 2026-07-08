# JobHunt-AI: UI Architecture

## 1. Design Principles

- **Local-first**: Runs entirely on the user's machine, no cloud services
- **Dark-first**: Dark theme by default (gray-950 bg, emerald accent)
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
| Routing | Hash-based (window.location.hash) | No react-router needed for simple SPA |

## 3. Color System

### 3.1 Theme Tokens

| Token | Value | Hex |
|-------|-------|-----|
| accent | emerald-500 | `#10b981` |
| accent-hover | emerald-600 | `#059669` |
| accent-text | emerald-400 | `#34d399` |
| bg | gray-950 | `#030712` |
| surface | gray-900 | `#111827` |
| surface-2 | gray-800 | `#1f2937` |
| surface-3 | gray-700 | `#374151` |
| border | gray-800 | `#1f2937` |
| text | gray-100 | `#f3f4f6` |
| text-dim | gray-400 | `#9ca3af` |
| text-muted | gray-500 | `#6b7280` |

### 3.2 Score Colors

| Range | Color | Hex |
|-------|-------|-----|
| 85-100 | Green | `#22c55e` |
| 70-84 | Lime | `#84cc16` |
| 50-69 | Yellow | `#eab308` |
| 30-49 | Orange | `#f97316` |
| 0-29 | Red | `#ef4444` |

## 4. Page Layout & Wireframe

### 4.1 Dashboard (Default View)

```
┌──────────────────────────────────────────────────────────────┐
│ Header                                                        │
│ ┌──────────────┐                              ┌────────────┐ │
│ │ JobHunt AI    │                              │ Ninad  [N] │ │
│ │ (emerald-400) │                              │            │ │
│ └──────────────┘                              └────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ Stats Bar                                                     │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│ │ 💼 Total     │  │ 📈 Matched   │  │ ✅ Applied   │         │
│ │    42        │  │    18        │  │     7        │         │
│ └──────────────┘  └──────────────┘  └──────────────┘         │
├──────────────────────────────────────────────────────────────┤
│ Filter Bar                                                    │
│ ┌──────────────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──┐ ┌──────┐  │
│ │ 🔍 Search...  │ │ All  │ │ All  │ │Score │ │≡ │ │ Scan │  │
│ └──────────────┘ └──────┘ └──────┘ └──────┘ └──┘ └──────┘  │
├────────────────────────────────┬─────────────────────────────┤
│ Job List                        │ Side Panel                  │
│ ┌──────────────────────────┐   │ ┌─────────────────────────┐ │
│ │ Senior AI Engineer       │   │ │ Recent Activity         │ │
│ │ Microsoft · Pune/Remote  │   │ │ ─────────────────────── │ │
│ │ ₹30-40L  LinkedIn  94%  │   │ │ • Applied at Flipkart   │ │
│ ├──────────────────────────┤   │ │ • Scanned LinkedIn (12) │ │
│ │ AI Application Lead      │   │ │ • Match score: 88%      │ │
│ │ Flipkart · Bangalore     │   │ └─────────────────────────┘ │
│ │ ₹28-35L  Naukri    88%  │   │ ┌─────────────────────────┐ │
│ ├──────────────────────────┤   │ │ Upcoming Interviews     │ │
│ │ Staff ML Engineer        │   │ │ ─────────────────────── │ │
│ │ Walmart · Bangalore      │   │ │ • Walmart - Jul 15     │ │
│ │ ₹35-45L  LIn      82%   │   │ └─────────────────────────┘ │
│ └──────────────────────────┘   │ ┌─────────────────────────┐ │
│                                │ │ Tips                    │ │
│                                │ │ ─────────────────────── │ │
│                                │ │ 💡 Update cv.md with    │ │
│                                │ │ vector DB experience    │ │
│                                │ └─────────────────────────┘ │
└────────────────────────────────┴─────────────────────────────┘
```

### 4.2 JobDetail View

```
┌──────────────────────────────────────────────────────────────┐
│ ← Back to jobs                                                │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Job Header                                                │ │
│ │ Senior AI Engineer                    ┌────┐             │ │
│ │ Microsoft · Pune/Remote               │94% │             │ │
│ │ ₹30-40L · LinkedIn · Posted 2026-07-07│Match│             │ │
│ │                                      └────┘             │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Match Breakdown                                           │ │
│ │ Skills Match (35%)  ████████████████████████████░  95%   │ │
│ │ Experience (25%)    █████████████████████████░░░  88%   │ │
│ │ Role Fit (20%)      ██████████████████████░░░░░░  82%   │ │
│ │ Location/Comp (10%) ██████████████████░░░░░░░░░░  70%   │ │
│ │ Growth Signal (10%) ███████████████░░░░░░░░░░░░░  65%   │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Job Description                                           │ │
│ │ We are looking for...                                     │ │
│ │ Requirements:                                             │ │
│ │ • 5+ years AI/ML engineering                             │ │
│ │ • Python, FastAPI                                         │ │
│ │ • LangChain, RAG systems                                  │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ⚡ AI-Identified Gaps                                     │ │
│ │ • Vector DB experience not in recent role                 │ │
│ │ • LLM eval frameworks - add if used                       │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [📄 Generate Tailored CV] [🚀 Apply] [🔖 Save]    [✕]   │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## 5. Component Tree

```
<App>
  ├── <Header>
  │   ├── Logo + "JobHunt AI"
  │   └── UserBadge (name, avatar initial)
  │
  ├── <StatsBar> (live from /api/stats)
  │   ├── StatCard (Total Jobs — Briefcase icon)
  │   ├── StatCard (Matched >80% — TrendingUp icon)
  │   └── StatCard (Applied — CheckCircle icon)
  │
  ├── <FilterBar>
  │   ├── SearchInput (debounced 300ms)
  │   ├── StatusFilter (pill buttons: all/discovered/applied/interview)
  │   ├── SourceFilter (dropdown: all/LinkedIn/Naukri/Company)
  │   ├── SortSelect (dropdown: score, date)
  │   └── ScanButton (triggers ScanConfig modal)
  │
  ├── <div className="main-content"> (flex row)
  │   ├── <JobList>
  │   │   └── <JobCard>[]
  │   │       ├── CompanyLogo placeholder
  │   │       ├── RoleInfo (title, company, location)
  │   │       ├── MatchBadge (color-coded)
  │   │       ├── SalaryTag
  │   │       ├── SourceIcon
  │   │       └── DatePosted
  │   │
  │   └── <SidePanel> (collapsible on mobile)
  │       ├── <RecentActivity> (last 10 actions)
  │       │   └── ActivityItem[]
  │       ├── <UpcomingInterviews>
  │       │   └── InterviewItem[]
  │       └── <Tips> (AI-generated)
  │           └── TipCard[]
  │
  ├── <JobDetail> (full view, replaces main content)
  │   ├── JobHeader (title, company, location, salary)
  │   ├── <MatchBreakdown>
  │   │   ├── OverallScore (large gauge)
  │   │   └── DimensionBar[] (5 dimensions)
  │   ├── <JobDescription> (rendered text)
  │   ├── <KeyGaps> (AI-identified)
  │   └── <ActionBar>
  │       ├── [Generate Tailored CV]
  │       ├── [Apply on Portal]
  │       └── [Save / Discard]
  │
  ├── <ScanConfig> (modal)
  │   ├── RoleInput (multi-select tags)
  │   ├── LocationInput
  │   ├── SourceCheckboxes
  │   └── ScanButton
  │
  └── <ScanProgress> (animated overlay during scan)
      ├── ProgressBar (animated)
      └── StatusLog (real-time log lines)
```

## 6. State Management

### 6.1 Context Shape

```js
{
  scan: {
    status: 'idle' | 'scanning' | 'done' | 'error',
    progress: { current: 12, total: 50, sources: ['linkedin', ...] },
    lastScanned: '2026-07-08T10:30:00Z'
  },
  jobs: {
    items: Map<id, Job>,
    filters: {
      search: '',
      status: 'all',
      source: 'all',
      sort: '-score',
      view: 'list' // 'list' | 'compact'
    },
    selectedId: null
  },
  match: {
    cache: Map<jobId, MatchResult>,
    pending: Set<jobId>
  },
  profile: {
    name: 'Ninad Gokhale',
    targetRoles: ['Senior AI Engineer', 'Senior ML Engineer'],
    locations: ['Pune', 'Remote'],
    salaryRange: { min: 22, max: 30 }
  }
}
```

### 6.2 Data Flow

```
[User Action] → dispatch({ type, payload }) → reducer → new state → React re-render
                                                      ↕
                                              fetch(/api/...)
                                                    ↕
                                              Express Route → SQLite → JSON
```

## 7. Component Specifications

### 7.1 JobCard

- **Dimensions**: Full width, ~80px height
- **States**: default, hover (border highlight), selected (accent left border)
- **Content**: title (bold), company·location (dim), salary, match badge (color-coded), source tag, date
- **Interaction**: onClick → navigate to `#/jobs/:id`

### 7.2 StatsBar

- **Layout**: 3-column grid
- Icons: Briefcase (total), TrendingUp (matched), CheckCircle (applied)
- Values: fetched from `GET /api/stats`
- Loading: skeleton shimmer
- Error: show dashes, retry button

### 7.3 FilterBar

- Search input with magnifying glass icon, debounced 300ms
- Status pills as segmented control
- Source and sort as dropdowns
- Scan button always visible, accent-colored
- Filters sync to URL search params for shareability

### 7.4 SidePanel

- Fixed width 260px on desktop, hidden on mobile (hamburger toggle)
- Sections: Recent Activity, Upcoming Interviews, Tips
- Each section collapsible
- Sticky on scroll within viewport

### 7.5 ScanConfig Modal

- Dark overlay + centered modal card
- Role tags (add/remove with input)
- Location tags (add/remove with input)
- Source checkboxes (LinkedIn, Naukri, Company)
- Start Scan button with loading state
- Close on Escape key + backdrop click

### 7.6 ScanProgress

- Full-page overlay or inline banner
- Animated progress bar
- Real-time log: "🔍 Searching LinkedIn...", "📄 Found 12 jobs on Naukri"
- Cancel button
- Auto-dismiss on completion

## 8. Route Design (Hash-based SPA)

| Route | Component | Description |
|-------|-----------|-------------|
| `#/` | Dashboard | Stats + filtered job list + side panel |
| `#/jobs/:id` | JobDetail | Single job view with match breakdown + actions |
| `#/applied` | Dashboard (filtered) | Dashboard pre-filtered to applied/saved |
| `#/settings` | SettingsPanel | cv.md refresh, API key config, source URLs |

## 9. Mobile Responsiveness

- **≥1024px**: Two-column (job list + side panel), JobDetail as full-width view
- **768-1023px**: Single column, side panel hidden behind toggle button
- **<768px**: Single column, FilterBar collapses to bottom sheet, JobDetail full-screen slide-in, touch targets min 44px

## 10. Accessibility

- All interactive elements keyboard-navigable (Tab, Enter, Escape)
- Match scores announced via aria-live regions
- Color is never the only indicator (score number + label always visible)
- Focus trap in modals (ScanConfig)
- Skip-to-content link
- ARIA labels for icon-only buttons

## 11. Performance Targets

| Metric | Target |
|--------|--------|
| Initial load (LCP) | <1.5s |
| Job list render (100 items) | <200ms |
| Job detail navigation | <100ms |
| Match score display (cached) | <50ms |
| Bundle size (gzipped) | <100KB |
