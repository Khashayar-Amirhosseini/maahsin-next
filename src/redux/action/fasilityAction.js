import { fasilityActionTypes } from "../types"


export const addFasilities=(newFasilities)=>{
    return({type:fasilityActionTypes.ADD_FASILITIES,fasilities:newFasilities})
}
export const removeFasility=(index)=>{
    return({type:fasilityActionTypes.REMOVE_FASILITY,index:index})
}
export const updateFasility=(Fasility)=>{
    return({type:fasilityActionTypes.UPDATE_FASILITY,fasility:Fasility})
}