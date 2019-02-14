import { http } from 'auto-libs';

// 获取列表
export interface DemoGetListData {
  skip: number;
  limit: number;
}

export const demoGetList = ({ skip, limit }: DemoGetListData) => {
  return http.request({
    url: '/demo/list',
    method: 'GET',
    params: {
      skip,
      limit,
    },
  });
};

// 获取详情
export interface DemoGetDetailData {
  demoId: number;
}

export const demoGetDetail = ({ demoId }: DemoGetDetailData) => {
  return http.request({
    url: `/demo/detail/${demoId}`,
    method: 'GET',
  });
};

// 创建
export interface DemoCreateData {
  foo: string;
  bar: string;
}

export const demoCreate = (data: DemoCreateData) => {
  return http.request({
    url: '/demo',
    method: 'POST',
    data: {
      ...data,
    },
  });
};
