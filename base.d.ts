declare module 'vconsole'
declare module 'vconsole-atzuche-env'

interface Window {
  isWX: boolean
  isWXWork: boolean
  isApp: boolean
  isAlipay: boolean
  isSmallSwan: boolean
  isJD: boolean
  isJDMP: boolean
  isMiniProgram: boolean
  isiOS: boolean
  isAndroid: boolean
}

interface Window {
  dpr: number
  rem: number
  AMap: any
  gio: any
  my: any
  wx: any
  jd: any
  swan: any
  atzuche: any
  NativeJsBridge: any
}

interface Window {
  platform: 'IOS' | 'ANDROID' | 'MINIPROGRAM-ALIPAY' | 'MINIPROGRAM-JD' | 'MINIPROGRAM-WECHAT' | 'WECHAT' | 'WECHAT-WORK' | 'ALIPAY' | 'JD' | 'WEB'
}

interface Dispatch<T> {
  type: string
  payload?: T
}

type DvaDispatch = <T, K = any>(args: Dispatch<T>) => Promise<K>

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_PACKAGE: 'dev' | 'prod'
  }
}
