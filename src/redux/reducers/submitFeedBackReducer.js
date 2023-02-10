import { submitFeedBackActionType } from "../types";

const InitialState={
    Success:[],
    Errors:[]
}

const SubmitFeedBackReducer = (state=InitialState,action) => {
    console.log(action)
    switch (action.type){
        case submitFeedBackActionType.UPDATE:{
            return{...state,Success:action.content.success,Errors:action.content.errors}
        }
        default:{
            return state
        }
    }
    
}
export default SubmitFeedBackReducer;