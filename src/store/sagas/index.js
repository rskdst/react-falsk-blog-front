import { all } from 'redux-saga/effects';
import { takeMenu } from './menu'
import { takeUser } from './user'
export default function* rootSaga() {
    yield all([
        takeMenu(),
        takeUser()
    ])
}