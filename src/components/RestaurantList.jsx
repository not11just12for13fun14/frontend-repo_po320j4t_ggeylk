import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function RestaurantCard({ r }){
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">{r.name}</h3>
          <p className="text-slate-300 text-sm">{r.cuisine_type || '—'} • {r.location || '—'}</p>
        </div>
        <div className="text-yellow-300 font-semibold">⭐ {r.average_rating?.toFixed?.(1) ?? Number(r.average_rating).toFixed(1)}</div>
      </div>
      {r.description && <p className="text-slate-300 mt-2 line-clamp-2">{r.description}</p>}
    </div>
  )
}

function RestaurantList(){
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () =>{
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/restaurants?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setItems(data.items || [])
    } finally{ setLoading(false) }
  }

  useEffect(()=>{ load() },[])

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search restaurants" className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" />
        <button onClick={load} className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2">Search</button>
      </div>
      {loading && <p className="text-slate-300">Loading...</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(r=> <RestaurantCard key={r._id} r={r} />)}
      </div>
    </div>
  )
}

export default RestaurantList
