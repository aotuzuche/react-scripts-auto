/// <reference types="react-scripts-auto" />

interface Window {
  isWX: boolean;
  isApp: boolean;
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_PACKAGE: 'dev' | 'prod';
  }
}
