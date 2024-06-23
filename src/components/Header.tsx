import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

const Header = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    auth?.logout()
    navigate('/')
  }
  return (
    <header className="md:max-w-6xl mx-auto">
      <ul className="navbar-nav flex md:flex-row md:justify-between [&>li>a]:md:px-8 [&>li>a]:md:py-3 bg-black text-white">
        <li className="nav-item active"><Link className="nav-link" to={''}>Home</Link></li>
        <li className="nav-item "><Link className="nav-link" to={'/about'}>About</Link></li>
        <li className="nav-item "><Link className="nav-link" to={''}>Shop</Link></li>
        {
          auth?.isAuthenticated ? (<>

            <li>
              <span>Welcome, {auth.user?.email}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link to="/admin">Bạn là admin?</Link>
            </li>
          </>) : (<>
            <li className="nav-item "><Link className="nav-link" to={'/login'}>Login</Link></li>
            <li className="nav-item "><Link className="nav-link" to={'/register'}>Sign Up</Link></li>
          </>
          )
        }

      </ul>
    </header>
  )
}

export default Header