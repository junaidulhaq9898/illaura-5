import { clerkMiddleware } from '@clerk/nextjs/server'
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next/static|favicon.ico|.*\\.(?:jpg|png|svg|css|js|json)).*)',
    '/api/(.*)',
    '/webhooks/(.*)', // Include webhooks if required
  ],
};