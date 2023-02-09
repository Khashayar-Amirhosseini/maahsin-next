import { userActionType } from "../types"

export const userLoggin=(user)=>{
    return{type:userActionType.LOG_IN,user:user}
}
export const userLogout=()=>{
    return{type:userActionType.LOG_OUT}
}