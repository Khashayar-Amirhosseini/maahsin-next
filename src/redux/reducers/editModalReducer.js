import { editModalActionType } from "../types"


const initialState={
    Open:false,
    SubmitHandler:null,
    Index:0
}
const EditModelReducer = (state=initialState,action) => {
    switch(action.type){ 
        case editModalActionType.OPEN:{
            return {...state,Open:true,SubmitHandler:action.submitHandler,Index:action.index}
        }
        case editModalActionType.CLOSE:{
            return{...state,Open:false}
        }
        default:{
            return state;
        } 
    }
    
}
 
export default EditModelReducer;