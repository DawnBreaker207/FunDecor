
import { Outlet } from "react-router-dom"
import AccessDenied from "../pages/website/AccessDenied"
import { useAuth } from "../contexts/AuthContext"

const PrivateRouter = () => {
  const auth = useAuth()
  if (auth?.user?.role !== "admin") {
    return <AccessDenied />
  }

  return <Outlet />

}

export default PrivateRouter
