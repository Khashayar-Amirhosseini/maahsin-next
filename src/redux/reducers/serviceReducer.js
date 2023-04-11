const { serviceActionTypes } = require("../types");
const ServiceInitialState={
    Services:[]
};
const ServiceReducer=(state=ServiceInitialState,action)=>{
    switch (action.type){
        case serviceActionTypes.ADD_SERVICES:{
            const newState={...state,Services:[...state.Services].concat(action.services)}
            return newState;
        }
        case serviceActionTypes.REMOVE_SERVICE:{
            const newService=[...state.Services].filter(d=>d.id!==action.index)
            return {...state,Services:newService}
        }
        case serviceActionTypes.UPDATE_SERVICE:{
            const newService=[...state.Services].filter(d=>d.id!==action.service.id)
            newService.concat(action.service)
            return{...state,Services:newService}
        }
        default:{
            return state;
        }
    }
   
}
export default ServiceReducer;