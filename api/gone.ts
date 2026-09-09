/**
 * HTTP 410 voor pagina's die bewust verdwenen zijn.
 *
 * Vercel kan via `redirects` alleen 301 en 302 sturen, en via `rewrites` alleen
 * een andere pagina tonen met status 200. Voor 410 is dus een functie nodig, en
 * vercel.json wijst elke verdwenen URL hierheen met een rewrite.
 *
 * Waarom 410 en niet 301: een 301 is een belofte dat de vraag ergens anders
 * beantwoord wordt. Voor een strandbar-reservatiesysteem is er geen pagina die
 * dat doet, en Google leest een 301 naar iets dat niet past als een soft 404 en
 * haalt hem alsnog uit de index. Dan win je niets en verlies je duidelijkheid.
 * 410 zegt wat er echt aan de hand is: weg, en komt niet terug. Google haalt zo
 * een URL sneller uit de index dan bij een 404.
 *
 * De pagina zelf is bewust klein en draagt noindex, zodat ze zelf nooit ergens
 * opduikt.
 */
export const config = { runtime: 'edge' }

const HTML = `<!doctype html>
<html lang="nl">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Deze pagina bestaat niet meer · Nivora Works</title>
<style>
  body{margin:0;min-height:100svh;display:grid;place-items:center;background:#060606;color:#f5f5f5;
    font:16px/1.6 Inter,system-ui,-apple-system,sans-serif;padding:24px;text-align:center}
  div{max-width:34rem;display:flex;flex-direction:column;gap:14px}
  h1{font-size:22px;font-weight:600;margin:0}
  p{margin:0;color:#a1a1a1}
  a{color:#f5f5f5}
</style>
<div>
  <h1>Deze pagina bestaat niet meer</h1>
  <p>We hebben ons aanbod teruggebracht tot waar we echt in thuis zijn. Wat we vandaag bouwen, staat op <a href="https://nivoraworks.com/nl">nivoraworks.com</a>.</p>
</div>
`

export default function handler() {
  return new Response(HTML, {
    status: 410,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=86400',
      'x-robots-tag': 'noindex',
    },
  })
}
