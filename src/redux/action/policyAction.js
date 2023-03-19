import { policyActionType } from "../types"
export const addPolicy=(newPolicies)=>{
    return ({type:policyActionType.ADD_POLICY,policies:newPolicies})
}
export const updatePolicy=(policy)=>{
    return({type:policyActionType.UPDATE_POLICY,policy:policy})
}
export const removePolicy=(index)=>{
    return({type:policyActionType.REMOVE_POLICY,index:index})
}