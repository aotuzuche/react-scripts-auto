import { connect } from 'dva'
import View from './view'

export default connect((model: any) => {
  return {
    store: model.index,
  }
})(View)
