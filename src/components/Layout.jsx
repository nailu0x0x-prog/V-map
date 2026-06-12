import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'ホーム' },
  { to: '/quiz', label: '診断' },
  { to: '/explore', label: '一覧' },
  { to: '/register', label: '登録' },
  { to: '/dashboard', label: 'マイページ' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-purple-600">
            Vmap
          </Link>
          <nav className="flex gap-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `hover:text-purple-600 ${isActive ? 'text-purple-600 font-semibold' : 'text-gray-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t bg-white text-center text-sm text-gray-400 py-4">
        © {new Date().getFullYear()} Vmap
      </footer>
    </div>
  )
}
