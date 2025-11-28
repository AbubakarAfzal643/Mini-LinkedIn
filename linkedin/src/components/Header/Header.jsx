import { Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "My Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-brandDark shadow-md border-b border-gray-700/50">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">
                    
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex-shrink-0">
                            <Logo width="45px" className="rounded-lg hover:opacity-90 transition-opacity" />
                        </Link>
                        
                        {authStatus && userData?.name && (
                            <div className="hidden md:flex flex-col">
                                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Welcome back</span>
                                <span className="text-white text-sm font-semibold truncate max-w-[150px]">
                                    {userData.name}!
                                </span>
                            </div>
                        )}
                    </div>

                    <ul className="flex items-center gap-2">
                        {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        className={({ isActive }) =>
                                            `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out 
                                            ${isActive 
                                                // ACTIVE STATE: Blue background, turns darker blue on hover
                                                ? 'bg-brandBlue text-white shadow-md hover:bg-blue-600 hover:shadow-lg' 
                                                
                                                // INACTIVE STATE: Transparent, turns Gray-700 on hover (visible against dark header)
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700' 
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}
                        
                        {authStatus && (
                            <li className="ml-4 border-l border-gray-700 pl-4">
                                <LogoutBtn className="text-gray-300 hover:text-red-400 font-medium text-sm transition-colors" />
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header