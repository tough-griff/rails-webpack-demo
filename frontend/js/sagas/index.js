import todoSaga from './todoSaga';

export default function* rootSaga() {
  yield [
    todoSaga(),
  ];
}
