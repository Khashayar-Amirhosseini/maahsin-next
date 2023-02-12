import { editModalActionType } from "../types"


export const openModal=(child,submitHandler)=>{
    return({type:editModalActionType.OPEN,child:child,submitHandler:submitHandler})
}
export const closeModal=()=>{
    return({type:editModalActionType.CLOSE})
}