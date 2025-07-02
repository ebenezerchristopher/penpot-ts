// This file provides global type definitions.

// For CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// THIS IS THE CORRECTED DECLARATION
// It now declares that ANY file ending in .scss is a CSS Module.
// This covers both `_Button.scss` and any potential `SomeComponent.module.scss`.
declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Other global types can remain
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
