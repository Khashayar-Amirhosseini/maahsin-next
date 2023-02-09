import { editModalActionType } from "../types"


const initialState={
    Open:false,
}
const EditModelReducer = (state=initialState,action) => {
    switch(action.type){
        case editModalActionType.OPEN:{
            return {...state,Open:true}
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