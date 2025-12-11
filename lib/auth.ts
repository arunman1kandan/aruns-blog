// Simple auth token - in production, use proper JWT or session management
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "arun123"

export function verifyAdminAuth(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function generateAuthToken(): string {
  // In production, use JWT or proper session management
  return Math.random().toString(36).substring(2, 15)
}
