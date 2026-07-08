import { useState } from 'react'
import Dashboard from './components/Dashboard'
import JobDetail from './components/JobDetail'
import ScanConfig from './components/ScanConfig'

function App() {
  const [view, setView] = useState('dashboard')
  const [selectedJob, setSelectedJob] = useState(null)
  const [showScanConfig, setShowScanConfig] = useState(false)

  const handleJobClick = (job) => {
    setSelectedJob(job)
    setView('detail')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-400">JobHunt AI</h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Ninad Gokhale</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
              N
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {view === 'dashboard' && (
          <Dashboard
            onJobClick={handleJobClick}
            onScanClick={() => setShowScanConfig(true)}
          />
        )}
        {view === 'detail' && selectedJob && (
          <JobDetail
            job={selectedJob}
            onBack={() => { setSelectedJob(null); setView('dashboard') }}
          />
        )}
      </main>

      {showScanConfig && (
        <ScanConfig onClose={() => setShowScanConfig(false)} />
      )}
    </div>
  )
}

export default App
