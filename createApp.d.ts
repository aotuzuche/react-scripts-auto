import { DvaInstance } from 'dva'

declare const createApp: ({ basename: string, defaultRoute: string }) => DvaInstance;
export default createApp;
