import { pictureActionType } from "../types"

export const addPictures=(addPictures)=>{
    return({type:pictureActionType.ADD_PICTURES,pictures:addPictures})
}
export const removePicture=(index)=>{
    return({type:pictureActionType.REMOVE_PICTURES,index:index})
}