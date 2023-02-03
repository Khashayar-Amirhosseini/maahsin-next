import { historyActionType } from "../types"

export const updateHistory=(newHistory)=>{
    return({type:historyActionType.UPDATE_HISTORY,history:newHistory})
}