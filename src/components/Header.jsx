import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/auth')
  }

  return (
    <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl">FoodReview</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-slate-300 hover:text-white">Restaurants</Link>
          {!token ? (
            <Link to="/auth" className="text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded">Login</Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-slate-300 text-sm">Hi, {user?.username || 'User'}</span>
              <button onClick={logout} className="text-white bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded">Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
