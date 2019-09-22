import { all } from 'redux-saga/effects';

import { watchGenerateSagas } from './saga';

export default function* rootSaga() {
  yield all([watchGenerateSagas()]);
}
