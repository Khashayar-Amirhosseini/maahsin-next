const { fasilityActionTypes } = require("../types");
const FasilityInitialState={
    Fasilities:[]
};
const FasilityReducer=(state=FasilityInitialState,action)=>{
    switch (action.type){
        case fasilityActionTypes.ADD_FASILITIES:{
            const newState={...state,Fasilities:[...new Set([...state.Fasilities].concat(action.fasilities))]}
            return newState;
        }
        case fasilityActionTypes.REMOVE_FASILITY:{
            const newFasility=[...state.Fasilities].filter(d=>d.id!==action.index);
            return {...state,Fasilities:newFasility}
        }
        case fasilityActionTypes.UPDATE_FASILITY:{
            const newFasility=[...state.Fasilities].filter(d=>d.id!==action.fasility.id)
            return{...state,Fasilities:[...new Set(newFasility.concat(action.fasility))]}
        }
        default:{
            return state;
        }
    }
   
}
export default FasilityReducer;