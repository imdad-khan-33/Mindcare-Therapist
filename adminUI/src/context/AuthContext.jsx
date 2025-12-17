import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem("token")
      if (savedToken) {
        try {
          // Verify token by fetching user profile
          const response = await axios.get("http://localhost:5000/api/user/profile", {
            headers: { Authorization: `Bearer ${savedToken}` }
          })
          setUser(response.data)
          setToken(savedToken)
        } catch (error) {
          console.error("Token verification failed:", error)
          localStorage.removeItem("token")
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }

    verifyToken()
  }, [])

  const login = (token, userData) => {
    localStorage.setItem("token", token)
    setToken(token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
