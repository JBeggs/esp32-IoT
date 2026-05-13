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
      <p className="paper-muted text-sm">We could not confirm the change.</p>
      <Link href="/profile" className="btn btn-primary w-full py-3">
        Back to profile
      </Link>
    </div>
  )
}

function ConfirmEmailConsume({ token }: { token: string }) {
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const [phase, setPhase] = useState<'loading' | 'err'>('loading')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await authApi.confirmEmailChange(token)
        if (!cancelled) {
          showSuccess('Email address updated.')
          router.push('/profile')
          router.refresh()
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setPhase('err')
          showError(err instanceof Error ? err.message : 'Invalid or expired link.')
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
          <p className="paper-muted text-sm">Confirming your new email…</p>
        </div>
      ) : (
        <>
          <p className="paper-muted text-sm mb-4">We could not confirm the change.</p>
          <Link href="/profile" className="btn btn-primary w-full py-3">
            Back to profile
          </Link>
        </>
      )}
    </div>
  )
}

function ConfirmEmailChangeInner() {
  const sp = useSearchParams()
  const token = sp.get('token')
  if (!token) {
    return <MissingTokenFallback />
  }
  return <ConfirmEmailConsume token={token} />
}

export default function ConfirmEmailChangePage() {
  return (
    <div className="min-h-screen tech-page-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="paper-surface p-8 rounded-xl paper-muted">Loading…</div>}>
        <ConfirmEmailChangeInner />
      </Suspense>
    </div>
  )
}
