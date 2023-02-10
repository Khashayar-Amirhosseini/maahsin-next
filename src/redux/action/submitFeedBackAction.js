import { submitFeedBackActionType } from "../types";

export const updateFeedBack=(content)=>{
    return{type:submitFeedBackActionType.UPDATE,content:content}
}