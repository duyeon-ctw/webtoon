// Simplified security utilities for demonstration
// In production, you would need access to proper node crypto modules

// Mock rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
};

// Mock rate limiting store
interface RateLimitInfo {
  requests: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitInfo>();

/**
 * Generate a mock CSRF token
 */
export function generateCSRFToken(): string {
  // In production, use crypto.randomBytes()
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Validate a mock CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  // In production, implement proper validation
  return token.length >= 20;
}

/**
 * Mock rate limiter
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  if (!ip) {
    return false;
  }

  const limitInfo = rateLimitStore.get(ip);

  if (!limitInfo) {
    rateLimitStore.set(ip, {
      requests: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return true;
  }

  if (now > limitInfo.resetTime) {
    limitInfo.requests = 1;
    limitInfo.resetTime = now + RATE_LIMIT.windowMs;
    return true;
  }

  if (limitInfo.requests >= RATE_LIMIT.max) {
    return false;
  }

  limitInfo.requests++;
  return true;
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}

/**
 * Simple string hash function for demo purposes
 */
export function hashPassword(password: string): string {
  // In production, use a proper hashing library with salt
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const salt = Math.random().toString(36).substring(2, 15);
  return `${salt}:${hash}`;
}

/**
 * Verify password with the hashed version
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
  // In production, use a proper verification method
  const [salt, storedHash] = hashedPassword.split(':');
  
  // Rehash the provided password with the stored salt
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return hash.toString() === storedHash;
}

/**
 * Mock data encryption (for demonstration only)
 */
export function encryptData(data: string, key: string): string {
  // In production, use proper encryption libraries
  // This is just a very basic XOR cipher for demonstration
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result); // Base64 encode
}

/**
 * Mock data decryption (for demonstration only)
 */
export function decryptData(encryptedData: string, key: string): string {
  // In production, use proper decryption libraries
  // This is just a very basic XOR cipher for demonstration
  const data = atob(encryptedData); // Base64 decode
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
} 