
/*import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import AddressReducer from "./addressReducer";
import DoctorReducer from "./doctorReducer";


const masterReducer=(state,action)=>{
  if(action.type===HYDRATE){
    const nextState={
      ...state,
      doctors:[...new Set([...action.payload.doctors.doctors,...state.doctors.doctors])]
    }
    return nextState
  }
  else{
    return combineReducers(state,action)
  }
  
}
export default combineReducers({
  address:AddressReducer,
  doctors:DoctorReducer,

});*/