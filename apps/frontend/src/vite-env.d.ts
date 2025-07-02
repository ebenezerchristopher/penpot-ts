/// <reference types="vite/client" />

// This block provides type definitions for CSS Modules.
// When you import a .module.css file, TypeScript will treat it
// as an object where keys are strings and values are strings.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
