import { editModalActionType } from "../types"


export const openModal=(submitHandler,index)=>{
    return({type:editModalActionType.OPEN,submitHandler:submitHandler,index:index})
}
export const closeModal=()=>{
    return({type:editModalActionType.CLOSE})
}