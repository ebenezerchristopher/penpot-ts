// This file provides global type definitions.

// For CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// For SCSS Modules
// The constant is renamed to 'styles' to avoid a name collision with the '*.module.css' declaration.
// The exported type remains the same.
declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Other global types can remain
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
