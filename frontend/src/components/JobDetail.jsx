import { useState, useEffect } from 'react'
import { useApp } from '../App'
import { ArrowLeft, ExternalLink, FileText, Sparkles, Bookmark, X, RefreshCw } from 'lucide-react'

function MatchBreakdown({ matchDetails }) {
  if (!matchDetails) return null

  const dimensions = typeof matchDetails === 'string'
    ? JSON.parse(matchDetails)
    : matchDetails

  const barColor = (s) => {
    if (s >= 85) return 'bg-green-500'
    if (s >= 70) return 'bg-lime-500'
    if (s >= 50) return 'bg-yellow-500'
    if (s >= 30) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const textColor = (s) => {
    if (s >= 85) return 'text-green-400'
    if (s >= 70) return 'text-lime-400'
    if (s >= 50) return 'text-yellow-400'
    if (s >= 30) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Match Breakdown</h3>
      <div className="space-y-3">
        {dimensions.map(d => (
          <div key={d.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{d.label} <span className="text-gray-500">({d.weight || ''})</span></span>
              <span className={`font-medium ${textColor(d.score)}`}>{d.score}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${barColor(d.score)}`}
                style={{ width: `${d.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function JobDetail({ onBack }) {
  const { state, dispatch, API } = useApp()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const { selectedId } = state.jobs

  useEffect(() => {
    if (!selectedId) return
    setLoading(true)
    fetch(`${API}/jobs/${selectedId}`)
      .then(r => r.json())
      .then(data => { setJob(data); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [selectedId, API])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="skeleton h-8 w-32" />
        <div className="skeleton h-40 w-full" />
        <div className="skeleton h-60 w-full" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-gray-400">Job not found</p>
        <button onClick={onBack} className="text-emerald-400 hover:underline mt-4 inline-block">
          ← Back to jobs
        </button>
      </div>
    )
  }

  const scoreColor = (s) => {
    if (s >= 85) return 'text-green-400'
    if (s >= 70) return 'text-lime-400'
    if (s >= 50) return 'text-yellow-400'
    if (s >= 30) return 'text-orange-400'
    return 'text-red-400'
  }

  const scoreRing = (s) => {
    if (s >= 85) return 'border-green-500 text-green-400'
    if (s >= 70) return 'border-lime-500 text-lime-400'
    if (s >= 50) return 'border-yellow-500 text-yellow-400'
    if (s >= 30) return 'border-orange-500 text-orange-400'
    return 'border-red-500 text-red-400'
  }

  const handleUpdateStatus = (status) => {
    dispatch({ type: 'UPDATE_JOB_STATUS', payload: { id: job.id, status } })
    setJob({ ...job, status })
  }

  const gaps = job.match_details
    ? (typeof job.match_details === 'string' ? JSON.parse(job.match_details) : job.match_details)
        .filter(d => d.score < 70)
    : []

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm transition-colors">
        <ArrowLeft size={16} /> Back to jobs
      </button>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-100">{job.title}</h2>
            <p className="text-gray-400 mt-1">{job.company} · {job.location || 'Remote'}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 flex-wrap">
              {job.salary && <span>{job.salary}</span>}
              {job.salary && <span>·</span>}
              <span className="capitalize">{job.source}</span>
              {job.posted_date && <><span>·</span><span>Posted {job.posted_date}</span></>}
            </div>
          </div>
          {job.match_score != null && (
            <div className={`w-20 h-20 rounded-full border-2 ${scoreRing(job.match_score)} flex items-center justify-center flex-shrink-0`}>
              <div className="text-center">
                <div className={`text-xl font-bold ${scoreColor(job.match_score)}`}>{Math.round(job.match_score)}</div>
                <div className="text-[10px] text-gray-500 -mt-1">Match</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MatchBreakdown matchDetails={job.match_details} />

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Job Description</h3>
        <div className="text-sm text-gray-300 space-y-3 leading-relaxed whitespace-pre-wrap">
          {job.description || 'No description available.'}
        </div>
      </div>

      {gaps.length > 0 && (
        <div className="bg-gray-900/50 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">AI-Identified Gaps</h3>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                {gaps.map((g, i) => (
                  <li key={i}>{g.reason || g.label || 'Missing qualification'}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
          <FileText size={16} /> Generate Tailored CV
        </button>
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
          <ExternalLink size={16} /> Apply on Portal
        </button>
        <button onClick={() => handleUpdateStatus('saved')}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-lg text-sm transition-colors">
          <Bookmark size={16} /> Save
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <select value={job.status || 'discovered'}
            onChange={e => handleUpdateStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 px-3 py-2 outline-none focus:border-emerald-500/50">
            <option value="discovered">Discovered</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="discarded">Discard</option>
          </select>
          <button onClick={() => handleUpdateStatus('discarded')}
            className="text-gray-500 hover:text-red-400 transition-colors p-2">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
