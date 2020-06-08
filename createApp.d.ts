import { DvaInstance } from 'dva'

interface ICreateApp {
  basename: string
  defaultRoute: string
  complete: (app: DvaInstance) => void
}

declare const createApp: (opts: ICreateApp) => void
export default createApp
