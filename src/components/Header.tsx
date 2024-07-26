import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const { Logout, isAuthenticated } = useContext(AuthContext)
  const { state } = useCart()
  const totalItem = state.items.reduce((total, item) => total + item.quantity, 0)
  const handleLogout = () => {
    Logout()
  }
  return (
    <>
      <header className="md:max-w-6xl mx-auto sticky">
        <ul className="navbar-nav flex py-6 md:flex-row md:justify-between items-center [&>li>a]:md:px-8 [&>li>a]:md:py-3 bg-black text-white">
          <li className="nav-item active"><NavLink className="nav-link" to={''}>Home</NavLink></li>
          <li className="nav-item "><NavLink className="nav-link" to={'/about'}>About</NavLink></li>
          {
            isAuthenticated ? (<>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <NavLink to="/admin">Bạn là admin?</NavLink>
              </li>
              <li>
                <NavLink to="/cart">
                  <Badge count={totalItem} showZero >
                    <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} />
                  </Badge>
                </NavLink>
              </li>
            </>) : (<>
              <li className="nav-item "><NavLink className="nav-link" to={'/login'}>Login</NavLink></li>
              <li className="nav-item "><NavLink className="nav-link" to={'/register'}>Sign Up</NavLink></li>
            </>
            )
          }

        </ul>
      </header>

    </>
  )
}

export default Header