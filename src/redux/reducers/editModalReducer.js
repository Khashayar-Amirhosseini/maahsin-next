import { editModalActionType } from "../types"


const initialState={
    Open:false,
    Child:null,
    SubmitHandler:null
}
const EditModelReducer = (state=initialState,action) => {
    switch(action.type){ 
        case editModalActionType.OPEN:{
            return {...state,Open:true,Child:action.child,SubmitHandler:action.submitHandler}
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