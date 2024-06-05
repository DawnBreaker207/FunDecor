import { Navigate, Outlet } from "react-router-dom"

const CheckPermission = () => {
  const userLogged = localStorage.getItem('token')
  return userLogged ? <Outlet /> : <Navigate to={'login'} />

}

export default CheckPermission
