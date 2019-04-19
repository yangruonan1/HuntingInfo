export default {
  namespace: 'Information', // model的命名空间
  // model中的状态数据 state
  state: {
    id:303
  },
  // 同步操作 修改state值
  reducers: {
    save(state, { payload }) {
      return {...state, ...payload}
    }
  },
}
