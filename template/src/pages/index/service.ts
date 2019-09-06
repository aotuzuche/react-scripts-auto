import { http } from 'auto-libs'

// 获取列表
export interface IDemoGetListData {
  skip: number
  limit: number
}

export const demoGetList = ({ skip, limit }: IDemoGetListData) => {
  return http.request({
    url: '/demo/list',
    method: 'GET',
    params: {
      skip,
      limit,
    },
  })
}

// 获取详情
export interface IDemoGetDetailData {
  demoId: number
}

export const demoGetDetail = ({ demoId }: IDemoGetDetailData) => {
  return http.request({
    url: `/demo/detail/${demoId}`,
    method: 'GET',
  })
}

// 创建
export interface IDemoCreateData {
  foo: string
  bar: string
}

export const demoCreate = (data: IDemoCreateData) => {
  return http.request({
    url: '/demo',
    method: 'POST',
    data: {
      ...data,
    },
  })
}
