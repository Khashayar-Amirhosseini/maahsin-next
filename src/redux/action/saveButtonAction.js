import { saveButtonActionType } from "../types"

export const isChanged=(isChanged)=>{
    return({type:saveButtonActionType.IS_CHANGED,isChanged:isChanged})
}
export const isSending=(isSending)=>{
    return({type:saveButtonActionType.IS_SENDING,isSending:isSending})
}