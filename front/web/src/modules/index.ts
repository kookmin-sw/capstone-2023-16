import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // 만든 리듀서를 이곳에 추가해주세요.
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;