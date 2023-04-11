import { pictureActionType } from "../types"

export const addPictures=(newPictures)=>{
    return({type:pictureActionType.ADD_PICTURES,pictures:newPictures})
}
export const removePicture=(index)=>{
    return({type:pictureActionType.REMOVE_PICTURES,index:index})
}