import { put, takeEvery, call } from 'redux-saga/effects';
import { onGenerateTasks, GENERATE_TASK_REQUEST } from './Actions';
import { generateTasks } from '../helper/functions';

export function* loadGenerateTasks() {
  const data = yield call(generateTasks);
  yield put(onGenerateTasks(data));
}

export function* watchGenerateSagas() {
  yield takeEvery([GENERATE_TASK_REQUEST], loadGenerateTasks);
}
