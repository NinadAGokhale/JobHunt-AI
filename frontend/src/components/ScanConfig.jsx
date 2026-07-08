import { useState } from 'react'
import { useApp } from '../App'
import { X, Search, Loader2 } from 'lucide-react'

function ScanConfig({ onClose }) {
  const { dispatch, API } = useApp()
  const [roles, setRoles] = useState(['Senior AI Engineer', 'Senior ML Engineer'])
  const [locations, setLocations] = useState(['Pune', 'Remote'])
  const [sources, setSources] = useState({ linkedin: true, naukri: true, company: false })
  const [scanning, setScanning] = useState(false)
  const [roleInput, setRoleInput] = useState('')
  const [locInput, setLocInput] = useState('')

  const handleScan = async () => {
    setScanning(true)
    dispatch({ type: 'SET_SCAN_STATUS', payload: { status: 'scanning' } })
    try {
      const r = await fetch(`${API}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roles, locations, sources }),
      })
      await r.json()
      setTimeout(() => {
        setScanning(false)
        dispatch({ type: 'SET_SCAN_STATUS', payload: { status: 'idle', lastScanned: new Date().toISOString() } })
        onClose()
      }, 2000)
    } catch {
      setScanning(false)
      dispatch({ type: 'SET_SCAN_STATUS', payload: { status: 'error' } })
    }
  }

  const addRole = (e) => {
    if (e.key === 'Enter' && roleInput.trim()) {
      setRoles([...roles, roleInput.trim()])
      setRoleInput('')
    }
  }

  const addLocation = (e) => {
    if (e.key === 'Enter' && locInput.trim()) {
      setLocations([...locations, locInput.trim()])
      setLocInput('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget && !scanning) onClose() }}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-100">
            <Search size={20} className="text-emerald-400" /> Scan Configuration
          </h2>
          {!scanning && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-200 transition-colors">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Target Roles</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {roles.map((r, i) => (
                <span key={r}
                  className="bg-emerald-500/10 text-emerald-400 text-sm px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  {r}
                  {!scanning && (
                    <button onClick={() => setRoles(roles.filter((_, j) => j !== i))} className="hover:text-red-400 ml-1">
                      <X size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {!scanning && (
              <input
                type="text"
                placeholder="Type a role and press Enter..."
                value={roleInput}
                onChange={e => setRoleInput(e.target.value)}
                onKeyDown={addRole}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-emerald-500/50"
              />
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Locations</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {locations.map((l, i) => (
                <span key={l}
                  className="bg-blue-500/10 text-blue-400 text-sm px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-1">
                  {l}
                  {!scanning && (
                    <button onClick={() => setLocations(locations.filter((_, j) => j !== i))} className="hover:text-red-400 ml-1">
                      <X size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {!scanning && (
              <input
                type="text"
                placeholder="Type a location and press Enter..."
                value={locInput}
                onChange={e => setLocInput(e.target.value)}
                onKeyDown={addLocation}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-emerald-500/50"
              />
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Sources</label>
            <div className="space-y-2">
              {[
                { key: 'linkedin', label: 'LinkedIn' },
                { key: 'naukri', label: 'Naukri' },
                { key: 'company', label: 'Company Career Pages' },
              ].map(s => (
                <label key={s.key} className={`flex items-center gap-3 text-sm text-gray-300 cursor-pointer ${scanning ? 'opacity-50' : ''}`}>
                  <input type="checkbox" checked={sources[s.key]}
                    onChange={() => !scanning && setSources(p => ({ ...p, [s.key]: !p[s.key] }))}
                    disabled={scanning}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 accent-emerald-500" />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleScan} disabled={scanning}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:text-gray-500 text-black font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
            {scanning ? (
              <><Loader2 size={16} className="animate-spin" /> Scanning...</>
            ) : (
              <><Search size={16} /> Start Scan</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScanConfig
