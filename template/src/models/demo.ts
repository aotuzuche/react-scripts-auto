import { demoGetList, DemoGetListData } from '../services/demo';
import { DemoPageState } from './interface';
import { Model } from 'dva';

const initialState: DemoPageState = {
  skip: 0,
  limit: 0,
  count: 0,
  list: [],
};

const demoModel: Model = {
  namespace: 'demo',
  state: initialState,
  reducers: {
    _demoGetList(state, { payload: list }) {
      return list;
    },
  },
  effects: {
    *demoGetList(action, { put, call }) {
      try {
        const data: DemoGetListData = action.payload || {};
        const list = yield call(demoGetList, data);
        yield put({ type: '_demoGetList', payload: list });
      } catch (err) {
        console.log('err', err);
      }
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
};

export default demoModel;
