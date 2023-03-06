import { entityActionType } from "../types"

export const updateEntity=(newEntity)=>{
    return{type:entityActionType.UPDATE,entity:newEntity}
}