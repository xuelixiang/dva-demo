import * as photoService from '../services/photos';

export default {
  namespace: 'photos',
  state: {
    photosList: [],
    total: null,
    currentPage: null,
    // percent: 20,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if(pathname === '/photos') {
          dispatch({
            type: 'fetch',
            payload: query
          });
        }
      });
    },
  },

  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(photoService.fetch, { page });
      yield put({
        type: 'pushData',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          currentPage: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: { id } }, { call, put }) {
      yield call(photoService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(photoService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(photoService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.photos.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },

  reducers: {
    pushData(state, { payload: { data: photosList, total, currentPage } }) {
      return { ...state, photosList, total, currentPage };
    },
    // percentIncrease(state){
    //   let percent = state.percent;
    //   if(percent < 100){
    //     percent += 10; 
    //     return { ...state, percent };
    //   }else{
    //     return { ...state };
    //   }
    // },
    // percentdecline(state){
    //   let percent = state.percent;
    //   if(percent > 0){
    //     percent -= 10; 
    //     return { ...state, percent };
    //   }else{
    //     return { ...state };
    //   }
    // },
    // setPercent(state, { payload: percent }){
    //   return { ...state, percent };
    // },
  }






}