import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API}/api/auth/${mode === 'login' ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'login' ? { email, password } : { username, email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      localStorage.setItem('token', data.access_token)
      // fetch me
      const meRes = await fetch(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${data.access_token}` }
      })
      const me = await meRes.json()
      localStorage.setItem('user', JSON.stringify(me))
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-md mx-auto p-6 pt-20">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-4">{mode === 'login' ? 'Login' : 'Create Account'}</h1>
          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} required />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input type="password" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button className="w-full bg-blue-600 hover:bg-blue-500 rounded px-3 py-2">{mode === 'login' ? 'Login' : 'Sign up'}</button>
          </form>
          <button onClick={()=>setMode(mode==='login'?'signup':'login')} className="mt-4 text-blue-300 hover:text-blue-200 text-sm">
            {mode==='login'?'Need an account? Sign up':'Have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
