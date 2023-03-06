import { entityActionType } from "../types";

const EntityInitialState={
    Entity:[]
}
const EntityReducer = (state=EntityInitialState,action) => {
   
        switch (action.type){
            case entityActionType.UPDATE:{
                console.log(action);
                return {...state,Entity:action.entity}
            }
            default:{
                return state;
            }
        } 
}
 
export default EntityReducer;