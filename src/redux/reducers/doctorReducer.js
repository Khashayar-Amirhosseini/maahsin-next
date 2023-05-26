const { doctorActionTypes } = require("../types");
const DoctorInitialState={
    doctors:[]
};
const DoctorReducer=(state=DoctorInitialState,action)=>{
    switch (action.type){
        case doctorActionTypes.ADD_DOCTORS:{
            const newState={...state,doctors:[...state.doctors].concat(action.doctors)}
            return newState;
        }
        case doctorActionTypes.REMOVE_DOCTOR:{
            const newDoctor=[...state.doctors].filter(d=>d.id!==action.index)
            return {...state,doctors:newDoctor}
        }
        case doctorActionTypes.UPDATE_DOCTOR:{
            const newDoctor=[...state.doctors].filter(d=>d.id!==action.doctor.id)
            return{...state,doctors:newDoctor.concat(action.doctor)}
        }
        default:{
            return state;
        }
    }
   
}
export default DoctorReducer;