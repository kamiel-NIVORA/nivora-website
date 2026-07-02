import { Link, type LinkProps } from 'react-router-dom'
import { useLang, localizePath } from '@/i18n'

/**
 * Drop-in replacement for react-router's Link that keeps internal navigation in
 * the active language: a string `to` gets a `/nl` prefix when Dutch is active.
 * External links, in-page anchors and mailto/tel pass through untouched. Object
 * `to` values are left as-is. Imported as `{ LangLink as Link }` so existing
 * `<Link>` markup keeps working while becoming language-aware.
 */
export function LangLink({ to, ...rest }: LinkProps) {
  const { lang } = useLang()
  const localized = typeof to === 'string' ? localizePath(to, lang) : to
  return <Link to={localized} {...rest} />
}
