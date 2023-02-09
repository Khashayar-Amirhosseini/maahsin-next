import { editModalActionType } from "../types"


export const openModal=()=>{
    return({type:editModalActionType.OPEN})
}
export const closeModal=()=>{
    return({type:editModalActionType.CLOSE})
}