import { Navigate, Outlet } from "react-router-dom"

const CheckPermisson = () => {
  const userLogged = localStorage.getItem('token')
  return userLogged ? <Outlet /> : <Navigate to={'login'} />

}

export default CheckPermisson
