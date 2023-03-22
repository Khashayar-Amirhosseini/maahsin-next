import { achievementActionType } from "../types"


export const addAcheivements=(newAcheivements)=>{
    return ({type:achievementActionType.ADD_ACHIEVEMENTS,acheivements:newAcheivements})
}
export const updatAcheivements=(acheivement)=>{
    return({type:achievementActionType.UPDATE_ACHIEVEMENT,acheivement:acheivement})
}
export const removeAcheivement=(index)=>{
    return({type:achievementActionType.REMOVE_ACHIEVEMENT,index:index})
}