'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { authApi } from '@/lib/api'
import { useToast } from '@/contexts/ToastContext'

function MissingTokenFallback() {
  return (
    <div className="paper-surface p-8 rounded-xl shadow-lg border border-black/5 max-w-md w-full text-center space-y-4">
      <p className="paper-muted text-sm">Could not complete sign-in from this link.</p>
      <Link href="/login" className="btn btn-primary w-full py-3">
        Go to login
      </Link>
    </div>
  )
}

function MagicConsume({ token }: { token: string }) {
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const [phase, setPhase] = useState<'loading' | 'err'>('loading')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await authApi.magicLinkConsume(token)
        if (!cancelled) {
          showSuccess('Signed in')
          router.push('/')
          router.refresh()
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setPhase('err')
          showError(err instanceof Error ? err.message : 'Invalid or expired sign-in link.')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token, router, showError, showSuccess])

  return (
    <div className="paper-surface p-8 rounded-xl shadow-lg border border-black/5 max-w-md w-full text-center">
      {phase === 'loading' ? (
        <div className="flex flex-col items-center gap-3 py-10">
          <Loader2 className="w-10 h-10 animate-spin text-vintage-primary" />
          <p className="paper-muted text-sm">Signing you in…</p>
        </div>
      ) : (
        <>
          <p className="paper-muted text-sm mb-4">Could not complete sign-in from this link.</p>
          <Link href="/login" className="btn btn-primary w-full py-3">
            Go to login
          </Link>
        </>
      )}
    </div>
  )
}

function MagicLinkInner() {
  const sp = useSearchParams()
  const token = sp.get('token')
  if (!token) {
    return <MissingTokenFallback />
  }
  return <MagicConsume token={token} />
}

export default function MagicLinkPage() {
  return (
    <div className="min-h-screen tech-page-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="paper-surface p-8 rounded-xl paper-muted">Loading…</div>}>
        <MagicLinkInner />
      </Suspense>
    </div>
  )
}
