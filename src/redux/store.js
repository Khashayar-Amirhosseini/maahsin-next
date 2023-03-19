import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";
import { combineReducers } from "redux";
import AddressReducer from "./reducers/addressReducer";
import DoctorReducer from "./reducers/doctorReducer";
import HistoryReducer from "./reducers/historyReducer";
import UserReducer from "./reducers/userReducer";
import EditModalReducer from "./reducers/editModalReducer"
import SaveButtonReducer from "./reducers/saveButtonReducer"
import { next } from "stylis";
import SubmitFeedBackReducer from "./reducers/submitFeedBackReducer";
import GoalReducer from "./reducers/goalReducer";
import EntityReducer from "./reducers/entityReducer";
import PolicyReducer from "./reducers/policyReducer";

const combinedReducer= combineReducers({
 DoctorReducer,HistoryReducer,AddressReducer,
 UserReducer,EditModalReducer,SaveButtonReducer,
 SubmitFeedBackReducer,GoalReducer,EntityReducer,PolicyReducer
})

const middleware = [thunk];
const initalState = {};
const uniqueState=(obj)=>{
  return obj = obj.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === obj.findIndex(obj => {
      return JSON.stringify(obj) === _value;
    });
  });
}
const makeStore = () => store;
const masterReducer=(state,action)=>{
  if(action.type===HYDRATE){
    const nextState={
      ...state,
      DoctorReducer:{doctors:[...uniqueState([...action.payload.DoctorReducer.doctors,...state.DoctorReducer.doctors])]},
      HistoryReducer:{HistoryInf:action.payload.HistoryReducer.HistoryInf},
      GoalReducer:{Goals:[...uniqueState([...action.payload.GoalReducer.Goals,...state.GoalReducer.Goals])]},
      PolicyReducer:{Policies:[...uniqueState([...action.payload.PolicyReducer.Policies,...state.PolicyReducer.Policies])]}
    }
    return nextState 
  }
  else{
    return combinedReducer(state,action)
  }
  
}
export const store = createStore(
  masterReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export const wrapper = createWrapper(makeStore);