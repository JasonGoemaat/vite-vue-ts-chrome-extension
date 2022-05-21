import { createServer, build } from 'vite'

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchBackground(server) {
  return build({
    configFile: 'vite.config.background.ts',
    mode: 'development',
    build: {
      watch: {},
    },
  })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
 function watchMain(server) {
  return build({
    configFile: 'vite.config.ts',
    mode: 'development',
    build: {
      watch: {},
    },
  })
}

// bootstrap
const server = await createServer({ configFile: 'vite.config.ts' })

await server.listen()
await watchBackground(server) // outputs to public/background.js, so run first
await watchMain(server)
