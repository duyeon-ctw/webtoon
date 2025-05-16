"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  type User,
  getUserByEmail,
  verifyPassword,
  createUser as createUserUtil,
  setCurrentSession,
  getCurrentSession,
  initializeDefaultUsers,
  type UserRole,
  deleteUser as deleteUserUtil,
} from "@/lib/auth-utils"
import { useToast } from "@/components/ui/use-toast"

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<User>
  signUp: (email: string, password: string, name: string, role?: UserRole) => Promise<User>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<User | null>
  deleteUser: (userId: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Initialize default users if none exist
    initializeDefaultUsers()

    // Check if user is logged in
    const checkAuth = () => {
      try {
        const session = getCurrentSession()
        setUser(session)
      } catch (error) {
        console.error("Failed to fetch session:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string): Promise<User> => {
    setLoading(true)
    try {
      const storedUser = getUserByEmail(email)

      if (!storedUser || !verifyPassword(password, storedUser.passwordHash)) {
        throw new Error("Invalid email or password")
      }

      // Create a clean user object without the password hash
      const { passwordHash, ...cleanUser } = storedUser

      // Update last login
      cleanUser.lastLogin = new Date().toISOString()

      setUser(cleanUser)
      setCurrentSession(cleanUser)

      toast({
        title: "Sign in successful",
        description: `Welcome back, ${cleanUser.name}!`,
      })

      return cleanUser
    } catch (error) {
      console.error("Sign in error:", error)
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string, role: UserRole = "reader"): Promise<User> => {
    setLoading(true)
    try {
      const storedUser = createUserUtil(name, email, password, role)

      // Create a clean user object without the password hash
      const { passwordHash, ...cleanUser } = storedUser

      setUser(cleanUser)
      setCurrentSession(cleanUser)

      toast({
        title: "Sign up successful",
        description: `Welcome to COZWO WEBTOON, ${cleanUser.name}!`,
      })

      return cleanUser
    } catch (error) {
      console.error("Sign up error:", error)
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Please check your information and try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setCurrentSession(null)
      setUser(null)

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })

      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      })
    }
  }

  const updateProfile = async (data: Partial<User>): Promise<User | null> => {
    if (!user) return null

    try {
      // In a real app, this would be an API call
      // For now, we'll just update the local storage
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      setCurrentSession(updatedUser)

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })

      return updatedUser
    } catch (error) {
      console.error("Update profile error:", error)
      toast({
        title: "Update failed",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      })
      return null
    }
  }
  
  const deleteUser = async (userId: string): Promise<boolean> => {
    try {
      const result = deleteUserUtil(userId)
      if (result) {
        toast({
          title: "Account deleted",
          description: "Your account has been successfully deleted.",
        })
      }
      return result
    } catch (error) {
      console.error("Delete account error:", error)
      toast({
        title: "Delete failed",
        description: "An error occurred while deleting your account.",
        variant: "destructive",
      })
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
