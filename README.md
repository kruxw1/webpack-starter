# Webpack starter kit

Instead of 'borrowing' a webpack starter kit, thought it would be fun to write/familiarize.

## Dynamic modules [data-modules]
DOM elements `[data-module]` can be initialized on page load or when added to the DOM tree. Removal from the DOM tree will attempt to call the module classes `unload()` function, if one is available. Create available modules in the directory `./src/modules`.

## Development run
`npm run dev`

## Production run
`npm run build`