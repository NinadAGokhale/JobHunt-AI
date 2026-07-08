import { useState } from 'react'
import { useApp } from '../App'
import { Search, Filter, ArrowUpDown, LayoutList, LayoutGrid } from 'lucide-react'

function FilterBar({ onScanClick }) {
  const { state, dispatch } = useApp()
  const { filters } = state.jobs

  const setFilter = (key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { [key]: value } })
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by title or company..."
          value={filters.search}
          onChange={e => setFilter('search', e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      <div className="flex gap-1 bg-gray-900 rounded-lg p-1 text-sm">
        {['all', 'discovered', 'applied', 'interview'].map(s => (
          <button key={s} onClick={() => setFilter('status', s)}
            className={`px-3 py-1.5 rounded-md capitalize transition-colors ${
              filters.status === s
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}>
            {s}
          </button>
        ))}
      </div>

      <select value={filters.source}
        onChange={e => setFilter('source', e.target.value)}
        className="bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 px-3 py-2 outline-none focus:border-emerald-500/50">
        <option value="all">All Sources</option>
        <option value="linkedin">LinkedIn</option>
        <option value="naukri">Naukri</option>
        <option value="company">Company</option>
      </select>

      <select value={filters.sort}
        onChange={e => setFilter('sort', e.target.value)}
        className="bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 px-3 py-2 outline-none focus:border-emerald-500/50">
        <option value="-score">Score ↓</option>
        <option value="score">Score ↑</option>
        <option value="-posted_date">Newest</option>
        <option value="posted_date">Oldest</option>
      </select>

      <button onClick={onScanClick}
        className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shrink-0">
        <Search size={16} /> Scan
      </button>
    </div>
  )
}

export default FilterBar
