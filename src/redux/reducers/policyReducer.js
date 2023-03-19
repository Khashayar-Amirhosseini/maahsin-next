import { policyActionType } from "../types";

const policyInitialState={
    Policies:[]
}
const PolicyReducer= (state=policyInitialState,action) => {
   switch(action.type){
       case policyActionType.ADD_POLICY:{
           return{...state,Policies:[...state.Policies].concat(action.policies)}
       }
       case policyActionType.UPDATE_POLICY:{
           const newPolicy=[...state.Policies].filter(p=>p.id!==action.policy.id)
           return{...state,Policies:newPolicy.concat(action.policy)} 
       }
       case policyActionType.REMOVE_POLICY:{
           const newPolicy=[...state.Policies].filter(p=>p.id!==action.index)
           return {...state,Policies:newPolicy}
       }
       default:{
           return state;
       }

   }
}
 
export default PolicyReducer;