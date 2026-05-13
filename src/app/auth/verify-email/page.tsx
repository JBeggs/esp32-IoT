'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Mail } from 'lucide-react'
import { authApi } from '@/lib/api'
import { useToast } from '@/contexts/ToastContext'

function VerifyEmailInner() {
  const sp = useSearchParams()
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const token = sp.get('token')
  const emailHint = sp.get('email')
  const [status, setStatus] = useState<'idle' | 'working' | 'done' | 'error'>(
    token ? 'working' : 'idle',
  )
  const [resendBusy, setResendBusy] = useState(false)

  useEffect(() => {
    if (!token) return undefined
    let cancelled = false
    ;(async () => {
      try {
        await authApi.verifyEmail(token)
        if (!cancelled) {
          setStatus('done')
          showSuccess('Email verified!')
          router.push('/')
          router.refresh()
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setStatus('error')
          const msg = err instanceof Error ? err.message : 'Invalid or expired link.'
          showError(msg)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token, router, showError, showSuccess])

  const resend = async () => {
    if (!emailHint) {
      showError('Enter your email on the login page and use Resend verification.')
      return
    }
    setResendBusy(true)
    try {
      await authApi.resendVerificationEmail(emailHint)
      showSuccess('If the account exists and needs verification, a new email was sent.')
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Could not send email.')
    } finally {
      setResendBusy(false)
    }
  }

  return (
    <div className="paper-surface p-8 rounded-xl max-w-md w-full text-center space-y-4 shadow-lg border border-black/5">
      {!token ? (
        <>
          <div className="w-16 h-16 brand-icon-tile rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Mail className="w-8 h-8 text-[rgb(var(--color-on-dark-surface))]" />
          </div>
          <h1 className="text-2xl font-bold font-playfair paper-title tracking-tight">Check your email</h1>
          <p className="paper-muted text-sm">
            Open the verification link we sent you, then sign in here. If you just clicked the link from
            mail, wait a moment — or copy the URL from your email address bar into this browser.
          </p>
          {emailHint ? (
            <button
              type="button"
              onClick={() => void resend()}
              disabled={resendBusy}
              className="btn btn-primary w-full py-3"
            >
              {resendBusy ? 'Sending…' : 'Resend verification email'}
            </button>
          ) : null}
          <Link href="/login" className="btn btn-secondary block w-full py-3">
            Back to sign in
          </Link>
        </>
      ) : (
        <>
          {status === 'working' ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <Loader2 className="w-10 h-10 animate-spin text-vintage-primary" />
              <p className="paper-muted text-sm">Verifying…</p>
            </div>
          ) : null}
          {status === 'done' ? (
            <p className="paper-muted text-sm">Redirecting…</p>
          ) : null}
          {status === 'error' ? (
            <>
              <p className="paper-muted text-sm">
                Request a fresh link below or contact support if this keeps failing.
              </p>
              {emailHint ? (
                <button
                  type="button"
                  disabled={resendBusy}
                  onClick={() => void resend()}
                  className="btn btn-primary w-full py-3"
                >
                  {resendBusy ? 'Sending…' : 'Resend verification'}
                </button>
              ) : null}
              <Link href="/login" className="btn btn-secondary block w-full py-3">
                Sign in
              </Link>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen tech-page-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="paper-surface p-8 rounded-xl paper-muted max-w-md w-full text-center">
            Loading…
          </div>
        }
      >
        <VerifyEmailInner />
      </Suspense>
    </div>
  )
}
