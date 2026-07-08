import { useState, useEffect } from 'react'
import { Search, Briefcase, TrendingUp, CheckCircle, Filter, ArrowUpDown } from 'lucide-react'

const MOCK_JOBS = [
  { id: '1', title: 'Senior AI Engineer', company: 'Microsoft', location: 'Pune / Remote', salary: '₹30-40L', score: 94, source: 'LinkedIn', date: '2026-07-07', status: 'discovered' },
  { id: '2', title: 'AI Application Lead', company: 'Flipkart', location: 'Bangalore / Remote', salary: '₹28-35L', score: 88, source: 'Naukri', date: '2026-07-06', status: 'discovered' },
  { id: '3', title: 'Staff ML Engineer', company: 'Walmart Global Tech', location: 'Bangalore', salary: '₹35-45L', score: 82, source: 'LinkedIn', date: '2026-07-05', status: 'applied' },
  { id: '4', title: 'Senior Data Scientist', company: 'JP Morgan', location: 'Mumbai', salary: '₹25-32L', score: 71, source: 'Company', date: '2026-07-04', status: 'discovered' },
  { id: '5', title: 'AI Platform Engineer', company: 'Zomato', location: 'Pune', salary: '₹24-30L', score: 65, source: 'LinkedIn', date: '2026-07-03', status: 'discarded' },
]

function Dashboard({ onJobClick, onScanClick }) {
  const [jobs, setJobs] = useState(MOCK_JOBS)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('-score')

  const stats = {
    total: jobs.length,
    matched: jobs.filter(j => j.score >= 80).length,
    applied: jobs.filter(j => j.status === 'applied').length
  }

  const filtered = jobs
    .filter(j => filter === 'all' || j.status === filter)
    .sort((a, b) => sort === '-score' ? b.score - a.score : a.score - a.score)

  const scoreColor = (s) => {
    if (s >= 85) return 'text-green-400'
    if (s >= 70) return 'text-lime-400'
    if (s >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const scoreBg = (s) => {
    if (s >= 85) return 'bg-green-500/10 border-green-500/30'
    if (s >= 70) return 'bg-lime-500/10 border-lime-500/30'
    if (s >= 50) return 'bg-yellow-500/10 border-yellow-500/30'
    return 'bg-red-500/10 border-red-500/30'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <Briefcase size={16} /> Total Jobs
          </div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-400 text-sm mb-1">
            <TrendingUp size={16} /> Matched (&gt;80%)
          </div>
          <div className="text-2xl font-bold text-emerald-400">{stats.matched}</div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-400 text-sm mb-1">
            <CheckCircle size={16} /> Applied
          </div>
          <div className="text-2xl font-bold text-blue-400">{stats.applied}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Jobs</h2>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1 text-sm">
            {['all', 'discovered', 'applied', 'interview'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md capitalize ${filter === s ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={onScanClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Search size={16} /> Scan Jobs
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(job => (
          <button key={job.id} onClick={() => onJobClick(job)}
            className="w-full text-left bg-gray-900/30 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{job.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{job.source}</span>
                </div>
                <div className="text-sm text-gray-400 mt-0.5">{job.company} · {job.location}</div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-sm text-gray-500">{job.salary}</span>
                <div className={`px-2.5 py-1 rounded-lg border text-sm font-bold ${scoreBg(job.score)} ${scoreColor(job.score)}`}>
                  {job.score}%
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
