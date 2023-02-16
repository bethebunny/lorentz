declare module 'https://ga.jspm.io/npm:react@18.2.0/dev.index.js' {
  // HACK
  // For some awful reason `export * from 'react';` doesn't seem to do anything
  // So instead, add any imports we want to use here as we use them.
  // We can't change the import style, because at the end of the day these are just type hints
  // and we need them to match what the imports from the actual library will be at runtime
  // eg. `import * as React from 'react.blah.js';
  export { useState, Component } from 'react';
  export * from 'react';
}
declare module 'https://ga.jspm.io/npm:react-dom@18.2.0/dev.index.js' {
  export { createRoot, Root } from 'react-dom/client';
  export * from 'react-dom';
}

declare module 'https://unpkg.com/es-react/dev' {
  export * as React from 'react';
  export * as ReactDOM from 'react-dom';
  // export { React, ReactDOM } from 'es-react';
}
