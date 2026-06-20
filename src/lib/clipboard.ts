import { useCallback, useRef, useState } from 'react'

/** Copy plain text (hex codes, prompts, font names) to the clipboard. */
export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}

/** Trigger a browser download for an asset served from /public. */
export function downloadAsset(url: string, filename?: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename ?? url.split('/').pop() ?? 'download'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/** Copy an image file itself to the clipboard (so it can be pasted into Figma,
 *  a deck, a chat, etc.). Falls back to copying the URL if the browser blocks
 *  image clipboard writes. */
export async function copyImage(url: string) {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type || 'image/png']: blob }),
    ])
  } catch {
    await copyText(new URL(url, window.location.origin).href)
  }
}

/** Download a list of assets one after another (browsers throttle bursts). */
export async function downloadAll(urls: string[]) {
  for (const url of urls) {
    downloadAsset(url)
    await new Promise((r) => setTimeout(r, 350))
  }
}

/** Small hook that flashes a "copied" state per key for ~1.6s. */
export function useCopyFeedback(timeout = 1600) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flash = useCallback(
    (key: string) => {
      setCopiedKey(key)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopiedKey(null), timeout)
    },
    [timeout],
  )

  return { copiedKey, flash }
}
