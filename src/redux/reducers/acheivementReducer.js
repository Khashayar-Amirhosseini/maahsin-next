import { achievementActionType } from "../types";

export const acheivementInitialState={
    Acheivements:[]
}
const AcheivementReducer = (state=acheivementInitialState,action) => {
    switch (action){
        case achievementActionType.ADD_ACHIEVEMENTS:{
            console.log(action.acheivements);
            return{...state,Acheivements:[...state.Acheivements].concat(action.acheivements)}
        }
        case achievementActionType.UPDATE_ACHIEVEMENT:{
            const newAcheivements=[...state.Acheivements].filter(a=>a.id!==action.acheivement.id);
            return{...state,Acheivements:newAcheivements.concat(action.acheivement)}
        }
        case achievementActionType.REMOVE_ACHIEVEMENT:{
            const newAcheivements=[...state.Acheivements].filter(a=>a.id!==action.index);
        }
        default:{
            return state
        }
    }
}
 
export default AcheivementReducer;