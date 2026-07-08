import { ArrowLeft, ExternalLink, FileText, Sparkles, Bookmark, X } from 'lucide-react'

function JobDetail({ job, onBack }) {
  const dimensions = [
    { label: 'Skills Match', score: 95, weight: '35%' },
    { label: 'Experience Level', score: 88, weight: '25%' },
    { label: 'Role Fit', score: 82, weight: '20%' },
    { label: 'Location / Comp', score: 70, weight: '10%' },
    { label: 'Growth Signal', score: 65, weight: '10%' },
  ]

  const scoreColor = (s) => {
    if (s >= 85) return 'bg-green-500'
    if (s >= 70) return 'bg-lime-500'
    if (s >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm">
        <ArrowLeft size={16} /> Back to jobs
      </button>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-400 mt-1">{job.company} · {job.location}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
              <span>{job.salary}</span>
              <span>·</span>
              <span>{job.source}</span>
              <span>·</span>
              <span>Posted {job.date}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">{job.score}%</div>
            <div className="text-xs text-gray-500 mt-1">Match</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Match Breakdown</h3>
        <div className="space-y-3">
          {dimensions.map(d => (
            <div key={d.label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{d.label} <span className="text-gray-500">({d.weight})</span></span>
                <span className={d.score >= 80 ? 'text-green-400' : d.score >= 60 ? 'text-yellow-400' : 'text-red-400'}>
                  {d.score}%
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${scoreColor(d.score)}`} style={{ width: `${d.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Job Description</h3>
        <div className="text-sm text-gray-300 space-y-3 leading-relaxed">
          <p>We are looking for a Senior AI Engineer to join our team and help build the next generation of AI-powered products. You will work on designing and deploying production-grade LLM systems, including RAG pipelines, agentic workflows, and fine-tuned models at scale.</p>
          <p className="font-medium text-gray-200 mt-4">Requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>5+ years of experience in AI/ML engineering</li>
            <li>Strong proficiency in Python and FastAPI</li>
            <li>Experience with LangChain, LangGraph, or similar orchestration frameworks</li>
            <li>Hands-on experience building RAG systems with vector databases</li>
            <li>Experience deploying ML systems on cloud infrastructure (Azure/AWS/GCP)</li>
            <li>Knowledge of Docker, Kubernetes, CI/CD for ML systems</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-amber-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">AI-Identified Gaps</h3>
            <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
              <li>Vector database experience (Pinecone/Weaviate) not explicitly called out in recent role</li>
              <li>LLM evaluation frameworks (LangSmith, RAGAS) — add a bullet if you've used these</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
          <FileText size={16} /> Generate Tailored CV
        </button>
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
          <ExternalLink size={16} /> Apply on Portal
        </button>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-lg text-sm transition-colors">
          <Bookmark size={16} /> Save
        </button>
        <button className="ml-auto text-gray-500 hover:text-red-400 transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

export default JobDetail
