import { entityActionType } from "../types";

const EntityInitialState={
    Entity:[]
}
const EntityReducer = (state=EntityInitialState,action) => {
   
        switch (action.type){
            case entityActionType.UPDATE:{
                return {...state,Entity:action.entity}
            }
            default:{
                return state;
            }
        } 
}
 
export default EntityReducer;