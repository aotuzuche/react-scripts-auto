// <reference types="react-scripts-auto" />

declare module 'at-js-sdk'
declare module 'vconsole'
declare module 'vconsole-atzuche-env'

interface Window {
  isWX: boolean
  isApp: boolean
}

interface Dispatch<T> {
  type: string
  payload: T
}

type DvaDispatch = <T, K extends any>(args: Dispatch<T>) => Promise<K>

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_PACKAGE: 'dev' | 'prod'
  }
}
