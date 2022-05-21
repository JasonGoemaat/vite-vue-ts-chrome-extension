# Vite Chrome Extension with Vue and Typescript

Run `yarn build` to build the extension in 'dist', or
`yarn watch` to continuously rebuild when you make changes.

In chrome, go to `chrome://extensions`, enable 'Developer mode' at the
top-right, then click 'Load unpacked' at the top left and select the 'dist'
directory.

Hot reloading isn't possible as far as I've seen, but you can use
`yarn watch` and you just have to re-open a page or popup or refresh
to see the changes.

Structure:

```
.
+-- dist (output directory)
+-- options (options page)
+-- popup (popup page)
+-- public (contents copied directly to dist
|   +-- background.js (generated background script from '/background.ts')
|   +-- manifest.json (extension manifest)
+-- scripts (scripts used in build)
|   +-- watch.mjs (script for 'yarn watch')
+-- src (main page)
```

If you want to add another page::

* Add folder 'mypage' with vue app source in it
* Add to 'include' in 'tsconfig.json' (like src, options, page)
* Add to vite.config.ts (like main, popup, options)

When updating 'background.ts' you'll need to refresh the extension
from the extension page I think.

# Setup

Testing a way to create a chrome extension using vite, vue, and typescript

Check out this page: https://anobjectisa.com/?p=410

Icons were created with icon-gen, using free SVG to resize.  Chrome recommends
(requires?) 128 pixel for store and install, 48 pixel for extension management,
and I think optional 16 for tab icons?

Created `public/manifest.json`

  yarn add @types/chrome

Created `background.js`

Add types to tsconfig.json:

  "types": ["chrome"]

Added popup/index.html and options/index.html

Added multiple inputs to vite.config.ts by adding a 'build' item to the config 
per this page: https://vitejs.dev/guide/build.html#multi-page-app

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        popup: resolve(__dirname, 'popup/index.html'),
        options: resolve(__dirname, 'options/index.html'),
      }
    }
  }
})
```

`__dirname` isn't recognized, so added node types and restarted VSCODE

  yarn add @types/node

I had to split into two files to get the background script to compile to
simply 'background.js' without a hash so the manifest can use it.

---

# Original Vite README

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
