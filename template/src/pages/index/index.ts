import { connect } from 'dva'
import Auth from '../../containers/auth'
import { DvaProvider } from '../../hooks/dva'
import View from './view'

export default connect((model: any) => {
  return {
    store: model.index,
  }
})(Auth(DvaProvider(View))) // 注意：若不需要登录的页面，直接传递View或DvaProvider(View)即可
