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
import PictureReducer from "./reducers/pictureReducer";
import AcheivementReducer from "./reducers/acheivementReducer";
import ServiceReducer from "./reducers/serviceReducer";
import ClusterReducer from "./reducers/clusterReducer";
import FasilityReducer from "./reducers/facilityReducer";

const combinedReducer= combineReducers({
 DoctorReducer,HistoryReducer,AddressReducer,
 UserReducer,EditModalReducer,SaveButtonReducer,
 SubmitFeedBackReducer,GoalReducer,EntityReducer,PolicyReducer,AcheivementReducer,PictureReducer,
 ServiceReducer,ClusterReducer,FasilityReducer
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
      PolicyReducer:{Policies:[...uniqueState([...action.payload.PolicyReducer.Policies,...state.PolicyReducer.Policies])]},
      AcheivementReducer:{Acheivements:[...uniqueState([...action.payload.AcheivementReducer.Acheivements,...state.AcheivementReducer.Acheivements])]},
      PictureReducer:{Pictures:[...uniqueState([...action.payload.PictureReducer.Pictures,...state.PictureReducer.Pictures])]},
      ServiceReducer:{Services:[...uniqueState([...action.payload.ServiceReducer.Services,...state.ServiceReducer.Services])]},
      ClusterReducer:{Clusters:[...uniqueState([...action.payload.ClusterReducer.Clusters,...state.ClusterReducer.Clusters])]},
      FasilityReducer:{Fasilities:[...uniqueState([...action.payload.FasilityReducer.Fasilities,...state.FasilityReducer.Fasilities])]}
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