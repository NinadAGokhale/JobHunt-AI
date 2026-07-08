import { useState } from 'react'
import { X, Search, Settings } from 'lucide-react'

function ScanConfig({ onClose }) {
  const [roles, setRoles] = useState(['Senior AI Engineer', 'Senior ML Engineer'])
  const [locations, setLocations] = useState(['Pune', 'Remote'])
  const [sources, setSources] = useState({ linkedin: true, naukri: true, company: false })
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      onClose()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Search size={20} className="text-emerald-400" /> Scan Configuration
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Target Roles</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {roles.map(r => (
                <span key={r} className="bg-emerald-500/10 text-emerald-400 text-sm px-3 py-1 rounded-full border border-emerald-500/30">
                  {r}
                </span>
              ))}
            </div>
            <input type="text" placeholder="Add a role..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50" />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Locations</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {locations.map(l => (
                <span key={l} className="bg-blue-500/10 text-blue-400 text-sm px-3 py-1 rounded-full border border-blue-500/30">
                  {l}
                </span>
              ))}
            </div>
            <input type="text" placeholder="Add a location..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50" />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Sources</label>
            <div className="space-y-2">
              {[
                { key: 'linkedin', label: 'LinkedIn' },
                { key: 'naukri', label: 'Naukri' },
                { key: 'company', label: 'Company Career Pages' },
              ].map(s => (
                <label key={s.key} className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={sources[s.key]}
                    onChange={() => setSources(p => ({ ...p, [s.key]: !p[s.key] }))}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 accent-emerald-500" />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleScan} disabled={scanning}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 text-black font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
            {scanning ? (
              <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Scanning...</>
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
