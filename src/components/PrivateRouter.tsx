import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import AccessDenied from "../pages/AccessDenied"

const PrivateRouter = () => {
  const auth = useContext(AuthContext)
  if (auth?.user?.role !== "admin") {
    return <AccessDenied />
  }

  return <Outlet />

}

export default PrivateRouter
