import { useApp } from '../App'
import { Search, Briefcase, TrendingUp, CheckCircle } from 'lucide-react'
import FilterBar from './FilterBar'
import SidePanel from './SidePanel'

function JobCard({ job, onClick }) {
  const scoreColor = (s) => {
    if (s >= 85) return 'text-green-400 bg-green-500/10 border-green-500/30'
    if (s >= 70) return 'text-lime-400 bg-lime-500/10 border-lime-500/30'
    if (s >= 50) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    if (s >= 30) return 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    return 'text-red-400 bg-red-500/10 border-red-500/30'
  }

  const statusLabel = (s) => {
    if (s === 'applied') return 'bg-blue-500/10 text-blue-400'
    if (s === 'interview') return 'bg-purple-500/10 text-purple-400'
    if (s === 'offer') return 'bg-emerald-500/10 text-emerald-400'
    if (s === 'rejected') return 'bg-red-500/10 text-red-400'
    if (s === 'discarded') return 'bg-gray-500/10 text-gray-400'
    return 'bg-gray-500/10 text-gray-400'
  }

  return (
    <button onClick={() => onClick(job)}
      className="w-full text-left bg-gray-900/30 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-all duration-150 hover:bg-gray-900/50 group animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-100 truncate group-hover:text-emerald-400 transition-colors">{job.title}</h3>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusLabel(job.status)}`}>
              {job.status}
            </span>
            <span className="text-[11px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{job.source}</span>
          </div>
          <div className="text-sm text-gray-400 mt-0.5">
            {job.company} · {job.location || 'Remote'}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {job.salary && <span className="text-sm text-gray-500 hidden sm:block">{job.salary}</span>}
          {job.match_score != null && (
            <div className={`px-2.5 py-1 rounded-lg border text-sm font-bold ${scoreColor(job.match_score)}`}>
              {Math.round(job.match_score)}%
            </div>
          )}
          {job.match_score == null && (
            <div className="text-xs text-gray-600 italic">Pending...</div>
          )}
        </div>
      </div>
    </button>
  )
}

function StatsBar({ stats }) {
  if (stats.loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="skeleton h-4 w-20 mb-2" />
            <div className="skeleton h-7 w-12" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 transition-colors hover:border-gray-700">
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
          <Briefcase size={16} /> Total Jobs
        </div>
        <div className="text-2xl font-bold text-gray-100">{stats.total}</div>
      </div>
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 transition-colors hover:border-gray-700">
        <div className="flex items-center gap-2 text-emerald-400 text-sm mb-1">
          <TrendingUp size={16} /> Matched (&gt;80%)
        </div>
        <div className="text-2xl font-bold text-emerald-400">{stats.matched}</div>
      </div>
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 transition-colors hover:border-gray-700">
        <div className="flex items-center gap-2 text-blue-400 text-sm mb-1">
          <CheckCircle size={16} /> Applied
        </div>
        <div className="text-2xl font-bold text-blue-400">{stats.applied}</div>
      </div>
    </div>
  )
}

function Dashboard({ onJobClick, onScanClick }) {
  const { state } = useApp()
  const { jobs, stats } = state
  const filtered = jobs.items

  return (
    <div className="space-y-5">
      <StatsBar stats={stats} />
      <FilterBar onScanClick={onScanClick} />

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4 opacity-30">🔍</div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No jobs found</h3>
              <p className="text-sm text-gray-600 mb-4">Start a scan to discover matching roles</p>
              <button onClick={onScanClick}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
                <Search size={16} /> Scan Jobs
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{filtered.length} jobs</span>
              </div>
              {filtered.map(job => (
                <JobCard key={job.id} job={job} onClick={onJobClick} />
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:block w-72 shrink-0">
          <SidePanel />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
