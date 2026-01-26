/**
 * Super Admins Configuration
 * 
 * Add email addresses of users who should have ADMIN role.
 * These users will be automatically created with ADMIN role when they first login with Google,
 * or their existing account will be upgraded to ADMIN.
 * 
 * To add a new super admin:
 * 1. Add their email to the SUPER_ADMIN_EMAILS array
 * 2. They can then login with Google and will have full admin access
 */

export const SUPER_ADMIN_EMAILS = [
  'racustefan34@gmail.com',
  'stelli243@gmail.com',

  // Add more super admin emails here:
  // 'another.admin@example.com',
]

/**
 * Check if an email is a super admin
 * @param {string} email 
 * @returns {boolean}
 */
export function isSuperAdmin(email) {
  if (!email) return false
  return SUPER_ADMIN_EMAILS.includes(email.toLowerCase())
}

/**
 * Default settings for super admin accounts
 */
export const SUPER_ADMIN_DEFAULTS = {
  role: 'ADMIN',
  active: true
}
