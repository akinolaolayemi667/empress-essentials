import { useSyncExternalStore } from 'react'

export type ToastAction =
  | { label: string; href: string; onClick?: undefined }
  | { label: string; onClick: () => void; href?: undefined }

export type Toast = {
  id: number
  message: string
  action?: ToastAction
}

const DURATION_MS = 4500

let current: Toast | null = null
let nextId = 1
let timer: number | undefined
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function dismissToast() {
  window.clearTimeout(timer)
  current = null
  emit()
}

/** Shows a single quiet confirmation, replacing any toast already visible */
export function showToast(message: string, action?: ToastAction) {
  window.clearTimeout(timer)
  current = { id: nextId++, message, action }
  timer = window.setTimeout(dismissToast, DURATION_MS)
  emit()
}

export function pauseToast() {
  window.clearTimeout(timer)
}

export function resumeToast() {
  if (!current) return
  window.clearTimeout(timer)
  timer = window.setTimeout(dismissToast, DURATION_MS)
}

export function useToast() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  )
}
