import * as React from 'react'

/*
由于dva@2.4.1版本不支持使用hooks，所以若要在无状态组件中使用dva的dispatch，使用以下方式

使用方式：
1. 在pages/xxx/index.ts中修改
   connect(......)(View)
   改为
   connect(......)(DvaProvider(View))

2. 在要使用dispatch的无状态组件中
   const dispatch = useDvaDispatch()
   const onClick = () => {
     dispatch({ type: ..., payload: ... })
   }

   在无状态组件中使用store，注意：在pages/xxx/index.ts的connect中，store不能改，即数据只允许绑定在props.store中
   const store = useDvaStore()
*/

interface IContext {
  dispatch: DvaDispatch
  store: any
}

const Ctx = React.createContext<IContext>({
  dispatch: () => Promise.resolve(null as any),
  store: {},
})

function useDvaDispatch() {
  return React.useContext(Ctx).dispatch
}

function useDvaStore<T extends any>() {
  return React.useContext(Ctx).store as T
}

function DvaProvider(View: any) {
  return (props: any) => {
    const { dispatch, store = {} } = props
    return (
      <Ctx.Provider value={{ dispatch, store }}>
        <View {...props} />
      </Ctx.Provider>
    )
  }
}

export { useDvaDispatch, useDvaStore, DvaProvider }
