import View from './view';
import { connect } from 'dva';
import { ModelNS } from '../../models/interface';

export default connect((model: ModelNS) => {
  return {
    index: model.index,
  };
})(View);
