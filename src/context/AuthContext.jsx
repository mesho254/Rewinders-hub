import React, { useContext, useState, useEffect } from "react"
import { auth } from "../hooks/firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    
    return auth.createUserWithEmailAndPassword(email, password)
    
  }

  function login(email, password) {
    setLoading(true)
    return auth.signInWithEmailAndPassword(email, password)
    
  }

  function logout() {
    setLoading(true)
    return auth.signOut()

  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [currentUser])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}