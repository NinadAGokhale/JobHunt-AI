import { useState, useEffect, useReducer, createContext, useContext } from 'react'
import Dashboard from './components/Dashboard'
import JobDetail from './components/JobDetail'
import ScanConfig from './components/ScanConfig'

const API = 'http://localhost:3001/api'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const initialState = {
  scan: { status: 'idle', progress: null, lastScanned: null },
  jobs: { items: [], filters: { search: '', status: 'all', source: 'all', sort: '-score' }, selectedId: null },
  stats: { total: 0, matched: 0, applied: 0, loading: true },
  profile: { name: 'Ninad Gokhale', initials: 'N' },
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATS':
      return { ...state, stats: { ...action.payload, loading: false } }
    case 'SET_JOBS':
      return { ...state, jobs: { ...state.jobs, items: action.payload } }
    case 'SET_FILTER':
      return { ...state, jobs: { ...state.jobs, filters: { ...state.jobs.filters, ...action.payload } } }
    case 'SELECT_JOB':
      return { ...state, jobs: { ...state.jobs, selectedId: action.payload } }
    case 'SET_SCAN_STATUS':
      return { ...state, scan: { ...state.scan, ...action.payload } }
    case 'UPDATE_JOB_STATUS':
      return {
        ...state,
        jobs: {
          ...state.jobs,
          items: state.jobs.items.map(j =>
            j.id === action.payload.id ? { ...j, status: action.payload.status } : j
          )
        }
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [view, setView] = useState('dashboard')
  const [showScanConfig, setShowScanConfig] = useState(false)

  // Hash-based routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1) || '/'
      if (hash.startsWith('/jobs/')) {
        const id = hash.split('/')[2]
        dispatch({ type: 'SELECT_JOB', payload: id })
        setView('detail')
      } else if (hash === '/applied') {
        dispatch({ type: 'SET_FILTER', payload: { status: 'applied' } })
        setView('dashboard')
      } else {
        setView('dashboard')
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Fetch stats
  useEffect(() => {
    fetch(`${API}/stats`)
      .then(r => r.json())
      .then(data => dispatch({ type: 'SET_STATS', payload: data }))
      .catch(() => dispatch({ type: 'SET_STATS', payload: { total: 0, matched: 0, applied: 0 } }))
  }, [])

  // Fetch jobs when filters change
  useEffect(() => {
    const { search, status, source, sort } = state.jobs.filters
    const params = new URLSearchParams({ status, source, sort })
    if (search) params.set('search', search)
    fetch(`${API}/jobs?${params}`)
      .then(r => r.json())
      .then(data => dispatch({ type: 'SET_JOBS', payload: data }))
      .catch(() => dispatch({ type: 'SET_JOBS', payload: [] }))
  }, [state.jobs.filters])

  const handleJobClick = (job) => {
    dispatch({ type: 'SELECT_JOB', payload: job.id })
    window.location.hash = `/jobs/${job.id}`
    setView('detail')
  }

  const handleBack = () => {
    window.location.hash = '/'
    setView('dashboard')
  }

  return (
    <AppContext.Provider value={{ state, dispatch, API }}>
      <div className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-sm">JH</span>
              </div>
              <h1 className="text-lg font-bold text-emerald-400 tracking-tight">JobHunt AI</h1>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">{state.profile.name}</span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold text-sm">
                {state.profile.initials}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-5">
          {view === 'dashboard' && (
            <Dashboard
              onJobClick={handleJobClick}
              onScanClick={() => setShowScanConfig(true)}
            />
          )}
          {view === 'detail' && (
            <JobDetail
              onBack={handleBack}
            />
          )}
        </main>

        {showScanConfig && (
          <ScanConfig onClose={() => setShowScanConfig(false)} />
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
