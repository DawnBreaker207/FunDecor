import { createContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, AuthType } from "../interfaces/Auth";
import instance from "../services/config";


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<AuthType | null>(null)

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "")
      // const token = JSON.parse(localStorage.getItem("token")?.accessToken)
      if (token) {
        try {
          const { data } = await instance.get("/660/users/1", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          setUser(data)
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
      const { email, password } = user
      const { data } = await instance.post("/login", { email, password })
      localStorage.setItem("token", data.accessToken)
      setUser(data.user);
      setIsAuthenticated(true)

    } catch (err) {
      console.error(err);
      setIsAuthenticated(false)
      setUser(null)

    }
  }
  const register = async (user: AuthType) => {
    try {
      const { email, password } = user
      const { data } = await instance.post("/register", { email, password })
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