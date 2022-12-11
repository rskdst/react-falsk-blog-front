import {GETROLE_ASYNC} from '../constants'
// 异步自增（等待1秒才触发自增action）
export const getRoleAsync = () => {
    return {
        type: GETROLE_ASYNC
    }
}

