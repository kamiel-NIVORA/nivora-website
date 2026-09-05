import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Build-only bundle for prerendering.
 *
 * `npm run build` runs this after the normal client build. It compiles the
 * landing template plus every content module into plain ESM that
 * scripts/prerender.mjs can import from Node and render with
 * renderToStaticMarkup.
 *
 * Reusing Vite (rather than calling esbuild by hand) means the alias, JSX and
 * import.meta.glob semantics are identical to the client build, so the static
 * HTML is produced by the very same components a visitor runs. That is what
 * makes the prerendered body a faithful copy rather than a second
 * implementation that can drift.
 *
 * No Tailwind plugin: the shell already links the client stylesheet, so no CSS
 * needs to come out of this pass.
 */
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    ssr: 'src/prerender/entry.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    target: 'node22',
    minify: false,
    rollupOptions: { output: { format: 'es', inlineDynamicImports: true } },
  },
})
