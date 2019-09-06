import { Model } from 'dva'
import { demoGetList, IDemoGetListData } from './service'

export interface IDemoPageListItem {
  foo: string
  bar: string
}

export interface IDemoPageState {
  skip: number
  limit: number
  count: number
  list: IDemoPageListItem[]
}

const initialState: IDemoPageState = {
  skip: 0,
  limit: 0,
  count: 0,
  list: [],
}

const indexModel: Model = {
  namespace: 'index',
  state: initialState,
  reducers: {
    _demoGetList(state, { payload: list }) {
      return list
    },
  },
  effects: {
    *demoGetList(action, { put, call }) {
      const data: IDemoGetListData = action.payload || {}
      const list = yield call(demoGetList, data)
      yield put({ type: '_demoGetList', payload: list })
    },
  },
  // subscriptions: {
  //   setup({ history, dispatch }: SubscriptionAPI, done: () => void) {
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/index') {
  //         dispatch({ type: 'demoGetList' });
  //       }
  //     });
  //   },
  // },
}

export default indexModel
