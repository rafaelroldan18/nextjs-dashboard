// auth.config.ts
import type { NextAuthConfig } from 'next-auth'
import type { NextRequest } from 'next/server'
import type { Session } from 'next-auth'
import { NextResponse } from 'next/server'

type AuthorizedArgs = {
  auth: Session | null
  request: NextRequest
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }: AuthorizedArgs) {
      const { nextUrl } = request
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

      if (isOnDashboard) {
        // Solo entra si está logueado
        return isLoggedIn
      }

      // Si ya está logueado y está fuera del dashboard, redirige al dashboard
      if (isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl))
      }

      // Resto de rutas públicas: permitir
      return true
    },
  },
  providers: [], // agrega tus providers cuando los tengas
} satisfies NextAuthConfig
