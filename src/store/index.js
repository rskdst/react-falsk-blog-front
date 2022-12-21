
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 与谷歌插件配合可以更直观的在浏览器上查看redux state 状态
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)
sagaMiddleware.run(mySaga)