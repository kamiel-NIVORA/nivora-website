/**
 * Lightweight chat markdown renderer for the Help Center assistant.
 *
 * Ported from the Nivora AIOS chat so replies read the same way: clean
 * paragraphs and lists, **bold**, _italic_, `code`, and [links](url). No
 * headings, tables or fenced code, those do not belong in a chat reply. Links
 * carry a subtle white underline accent.
 */
import type { ReactNode } from 'react'

function renderInline(text: string, keyPrefix = 'i'): ReactNode[] {
  if (!text) return []
  const out: ReactNode[] = []
  const re =
    /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|_([^_\n]+)_|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|https?:\/\/[^\s)]+)/g
  let lastIdx = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) out.push(text.slice(lastIdx, m.index))
    const matched = m[0]
    if (m[2] !== undefined || m[3] !== undefined) {
      out.push(
        <strong key={`${keyPrefix}-${k++}`} className="font-semibold text-ink">
          {m[2] ?? m[3]}
        </strong>,
      )
    } else if (m[4] !== undefined || m[5] !== undefined) {
      out.push(
        <em key={`${keyPrefix}-${k++}`} className="italic">
          {m[4] ?? m[5]}
        </em>,
      )
    } else if (m[6] !== undefined) {
      out.push(
        <code
          key={`${keyPrefix}-${k++}`}
          className="break-words rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[12.5px] text-ink-soft"
        >
          {m[6]}
        </code>,
      )
    } else if (m[7] !== undefined && m[8] !== undefined) {
      const href = m[8]
      const internal = href.startsWith('/')
      out.push(
        <a
          key={`${keyPrefix}-${k++}`}
          href={href}
          {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          className="break-words font-medium text-ink underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white/60"
        >
          {m[7]}
        </a>,
      )
    } else {
      out.push(
        <a
          key={`${keyPrefix}-${k++}`}
          href={matched}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all font-medium text-ink underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white/60"
        >
          {matched}
        </a>,
      )
    }
    lastIdx = m.index + matched.length
  }
  if (lastIdx < text.length) out.push(text.slice(lastIdx))
  return out
}

export function renderChatMarkdown(content: string): ReactNode {
  if (!content) return null
  const lines = content.split('\n')
  const out: ReactNode[] = []
  let bullets: { ordered: boolean; items: string[] } | null = null

  const flush = () => {
    if (!bullets) return
    const { ordered, items } = bullets
    const ListTag = ordered ? 'ol' : 'ul'
    out.push(
      <ListTag
        key={`l-${out.length}`}
        className={`${ordered ? 'list-decimal' : 'list-disc'} my-1 space-y-1 pl-5 marker:text-white/40`}
      >
        {items.map((it, idx) => (
          <li key={idx}>{renderInline(it, `li-${out.length}-${idx}`)}</li>
        ))}
      </ListTag>,
    )
    bullets = null
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const bullet = /^\s*[-*•]\s+(.+)$/.exec(line)
    const ordered = /^\s*\d+[.)]\s+(.+)$/.exec(line)
    if (bullet) {
      if (!bullets || bullets.ordered) {
        flush()
        bullets = { ordered: false, items: [] }
      }
      bullets.items.push(bullet[1])
      continue
    }
    if (ordered) {
      if (!bullets || !bullets.ordered) {
        flush()
        bullets = { ordered: true, items: [] }
      }
      bullets.items.push(ordered[1])
      continue
    }
    flush()
    if (line.trim() === '') {
      out.push(<div key={`br-${i}`} className="h-2.5" />)
      continue
    }
    out.push(
      <p key={`p-${i}`} className="leading-[1.65]">
        {renderInline(line, `inline-${i}`)}
      </p>,
    )
  }
  flush()
  return <>{out}</>
}
