import { connect } from 'dva'
import Auth from '../../containers/auth'
import View from './view'

export default connect((model: any) => {
  return {
    store: model.index,
  }
})(Auth(View, process.env.NODE_ENV === 'development')) // 注意：若不需要登录的页面，直接传递View即可
