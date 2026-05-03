import { resolve, dirname } from 'path'
import { existsSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Resolve theme gem's _frontend/ directory for Vite alias resolution.
// Tries: 1) local sibling dir, 2) bundler gem path, 3) installed gem.
export function resolveThemeFrontend() {
  // Local development: theme is a sibling directory
  const local = resolve(__dirname, '../../../jekyll-theme-isotc211/_frontend')
  if (existsSync(local)) return local

  // Installed gem via bundler
  try {
    const gemRoot = execSync('bundle show jekyll-theme-isotc211', { encoding: 'utf-8' }).trim()
    const gemFrontend = resolve(gemRoot, '_frontend')
    if (existsSync(gemFrontend)) return gemFrontend
  } catch {}

  return null
}
