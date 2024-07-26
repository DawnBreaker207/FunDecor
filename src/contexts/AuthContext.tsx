import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContextType, AuthProviderProps, AuthType } from "../common/types/Auth";
import { Check_Authorization, Sign_In, Sign_Up } from "../services/authentication.services";


export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}
const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<AuthType | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      // const token = localStorage.getItem("token")?.replace(/^"|"$/g, '')
      const token = localStorage.getItem("token")
      // const token = JSON.parse(localStorage.getItem("token")?.accessToken)
      if (token) {
        try {
          const data = await Check_Authorization(token)
          // if (data.user.role == "admin") {
          //   navigate("/admin")
          // } else {
          //   navigate("/")
          // }
          setUser(data.user)
          setIsAuthenticated(true)
        } catch (err) {
          console.error(err);
          setIsAuthenticated(false)
          setUser(null)
        }
      }
    })()

  }, [])
  const Login = async (user: AuthType) => {
    try {
      const data = await Sign_In(user)
      localStorage.setItem("token", data.accessToken)
      setUser(data?.user);
      setIsAuthenticated(true)
      navigate("/admin")
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false)
      setUser(null)

    }
  }
  const Register = async (user: AuthType) => {
    try {
      const data = await Sign_Up(user)
      localStorage.setItem("token", data.accessToken)
      setIsAuthenticated(true)
      navigate("/login")
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false)
      setUser(null)

    }
  }
  const Logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    navigate("/")
  }

  return (<AuthContext.Provider value={{ isAuthenticated, user, Register, Login, Logout }}>{children}</AuthContext.Provider>)
}

export default AuthContextProvider