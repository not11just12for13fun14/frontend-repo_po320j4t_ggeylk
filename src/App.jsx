import Header from './components/Header'
import RestaurantList from './components/RestaurantList'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Discover great places to eat</h1>
          <p className="text-slate-300 mt-2">Read honest reviews, share your food experiences, and explore top-rated restaurants.</p>
        </div>
      </section>
      <RestaurantList />
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <Link to="/test" className="text-slate-400 hover:text-white text-sm underline">Connection test</Link>
      </div>
    </div>
  )
}

export default App
