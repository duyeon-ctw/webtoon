// Types for our authentication system
export type UserRole = "admin" | "creator" | "translator" | "reader"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface StoredUser extends User {
  passwordHash: string // In a real app, this would be properly hashed
}

// Simple password "hashing" for demo purposes
// In a real app, use bcrypt or similar
export function hashPassword(password: string): string {
  return btoa(password) // This is NOT secure, just for demo
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// User storage functions
export function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return []

  try {
    const users = localStorage.getItem("webtoon_users")
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error("Failed to get users:", error)
    return []
  }
}

export function saveUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("webtoon_users", JSON.stringify(users))
  } catch (error) {
    console.error("Failed to save users:", error)
  }
}

export function getUserByEmail(email: string): StoredUser | undefined {
  const users = getUsers()
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export function createUser(name: string, email: string, password: string, role: UserRole = "reader"): StoredUser {
  const users = getUsers()

  // Check if user already exists
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("User with this email already exists")
  }

  const newUser: StoredUser = {
    id: generateId(),
    name,
    email,
    role,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    avatar: `/placeholder.svg?height=200&width=200&text=${name.charAt(0)}`,
  }

  users.push(newUser)
  saveUsers(users)

  return newUser
}

// Initialize with default admin and user if none exist
export function initializeDefaultUsers(): void {
  if (typeof window === "undefined") return

  const users = getUsers()

  if (users.length === 0) {
    // Create admin
    createUser("Admin User", "admin@cozwo.com", "admin123", "admin")

    // Create regular user
    createUser("Demo User", "user@cozwo.com", "user123", "reader")

    // Create creator
    createUser("Creator Demo", "creator@cozwo.com", "creator123", "creator")
  }
}

// Session management
export function getCurrentSession(): User | null {
  if (typeof window === "undefined") return null

  try {
    const session = localStorage.getItem("webtoon_session")
    return session ? JSON.parse(session) : null
  } catch (error) {
    console.error("Failed to get session:", error)
    return null
  }
}

export function setCurrentSession(user: User | null): void {
  if (typeof window === "undefined") return

  try {
    if (user) {
      localStorage.setItem("webtoon_session", JSON.stringify(user))
    } else {
      localStorage.removeItem("webtoon_session")
    }
  } catch (error) {
    console.error("Failed to set session:", error)
  }
}

// Update user
export function updateUser(userId: string, updates: Partial<User>): User | null {
  const users = getUsers()
  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex === -1) return null

  const updatedUser = { ...users[userIndex], ...updates }
  users[userIndex] = updatedUser
  saveUsers(users)

  // Update session if this is the current user
  const currentSession = getCurrentSession()
  if (currentSession && currentSession.id === userId) {
    setCurrentSession(updatedUser)
  }

  return updatedUser
}

// Delete user
export function deleteUser(userId: string): boolean {
  const users = getUsers()
  const filteredUsers = users.filter((user) => user.id !== userId)

  if (filteredUsers.length === users.length) return false

  saveUsers(filteredUsers)

  // Clear session if this is the current user
  const currentSession = getCurrentSession()
  if (currentSession && currentSession.id === userId) {
    setCurrentSession(null)
  }

  return true
}
