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
        default:{
            return state;
        }
    }
   
}
export default DoctorReducer;