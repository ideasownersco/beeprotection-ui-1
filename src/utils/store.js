import rootReducer from 'utils/reducers';
import rootSaga from 'utils/sagas';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

let Store;

if (__DEV__) {
  const logger = createLogger({
    collapsed: true,
    duration: true,
  });

  Store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      Store.replaceReducer(nextRootReducer);
    });
  }
} else {
  Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);
// persistStore(Store, {storage: AsyncStorage}).purge();
// persistStore(
//   Store,
//   {
//     whitelist: [
//       // 'propertyReducer',
//       // 'ormReducer',
//       // 'app',
//       // 'user',
//       // 'user',
//     ],
//     storage: AsyncStorage,
//   },
//   () => {},
// );

export default Store;
