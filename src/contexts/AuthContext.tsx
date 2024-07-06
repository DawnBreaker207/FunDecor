import { createContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, AuthType } from "../interfaces/Auth";
import { Check_Authorization, Sign_In, Sign_Up } from "../services/authentication.config";


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<AuthType | null>(null)

  useEffect(() => {
    (async () => {
      // const token = localStorage.getItem("token")?.replace(/^"|"$/g, '')
      const token = localStorage.getItem("token")
      // const token = JSON.parse(localStorage.getItem("token")?.accessToken)
      if (token) {
        try {
          const data = await Check_Authorization(token)
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
  const login = async (user: AuthType) => {
    try {
      const data = await Sign_In(user)
      localStorage.setItem("token", data.accessToken)
      setUser(data?.user);
      setIsAuthenticated(true)

    } catch (err) {
      console.error(err);
      setIsAuthenticated(false)
      setUser(null)

    }
  }
  const register = async (user: AuthType) => {
    try {
      const data = await Sign_Up(user)
      localStorage.setItem("token", data.accessToken)
      setIsAuthenticated(true)
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false)
      setUser(null)

    }
  }
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (<AuthContext.Provider value={{ isAuthenticated, user, register, login, logout }}>{children}</AuthContext.Provider>)
}

export default AuthContextProvider