
import {REGISTER,LOGIN,GETUSER_ASYNC} from '../constants'

export const register = (data)=>{
    return {
        type:REGISTER,
        data:data
    }
}

export const login = (data)=>{
    return {
        type:LOGIN,
        data:data
    }
}


export const getUser = ()=>{
    return {
        type:GETUSER_ASYNC
    }
}