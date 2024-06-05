import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="md:max-w-6xl mx-auto">
      <ul className="navbar-nav flex md:flex-row md:justify-between [&>li>a]:md:px-8 [&>li>a]:md:py-3 bg-black text-white">
        <li className="nav-item active"><Link className="nav-link" to={''}>Home</Link></li>
        <li className="nav-item "><Link className="nav-link" to={'/about'}>About</Link></li>
        <li className="nav-item "><Link className="nav-link" to={''}>Shop</Link></li>
        <li className="nav-item "><Link className="nav-link" to={'/login'}>Login</Link></li>
        <li className="nav-item "><Link className="nav-link" to={'/register'}>Sign Up</Link></li>
      </ul>
    </header>
  )
}

export default Header