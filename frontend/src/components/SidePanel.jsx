import { Clock, Calendar, Lightbulb } from 'lucide-react'

const MOCK_ACTIVITY = [
  { id: 1, text: 'Applied at Flipkart', time: '2h ago', type: 'apply' },
  { id: 2, text: 'Scanned LinkedIn — 12 new jobs', time: '4h ago', type: 'scan' },
  { id: 3, text: 'Match score: AI Lead @ Flipkart — 88%', time: '5h ago', type: 'match' },
  { id: 4, text: 'Saved Sr. AI Engineer @ Microsoft', time: '1d ago', type: 'save' },
]

const MOCK_INTERVIEWS = [
  { id: 1, company: 'Walmart Global Tech', role: 'Staff ML Engineer', date: 'Jul 15, 2026' },
]

const MOCK_TIPS = [
  'Add vector database experience to cv.md for better matching',
  'Mention LLM evaluation frameworks (LangSmith, RAGAS)',
  'Update your location preferences for remote roles',
]

function SidePanel() {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Clock size={14} className="text-emerald-400" />
          <span className="font-medium text-gray-300">Recent Activity</span>
        </div>
        <div className="space-y-2">
          {MOCK_ACTIVITY.map(a => (
            <div key={a.id} className="text-xs text-gray-500 leading-relaxed">
              {a.text}
              <span className="text-gray-600 ml-1">— {a.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Calendar size={14} className="text-blue-400" />
          <span className="font-medium text-gray-300">Upcoming Interviews</span>
        </div>
        {MOCK_INTERVIEWS.length === 0 ? (
          <p className="text-xs text-gray-600">No upcoming interviews</p>
        ) : (
          <div className="space-y-2">
            {MOCK_INTERVIEWS.map(i => (
              <div key={i.id} className="text-xs">
                <div className="text-gray-300 font-medium">{i.company}</div>
                <div className="text-gray-500">{i.role}</div>
                <div className="text-emerald-400 mt-0.5">{i.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-900/50 border border-amber-500/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Lightbulb size={14} className="text-amber-400" />
          <span className="font-medium text-gray-300">Tips</span>
        </div>
        <div className="space-y-2">
          {MOCK_TIPS.map((tip, i) => (
            <div key={i} className="text-xs text-gray-500 leading-relaxed">
              💡 {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SidePanel
