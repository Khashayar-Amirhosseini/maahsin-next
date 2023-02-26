const { saveButtonActionType } = require("../types");


const initialState = {
    IsChanged:false,
    IsSending:false
  };
const SaveButtonReducer=(state=initialState,action)=>{
    switch (action.type){
        case saveButtonActionType.IS_CHANGED:{
            return{...state,IsChanged:action.isChanged}
        }
        case saveButtonActionType.IS_SENDING:{
            return{...state,IsSending:action.isSending}
        }
        default:{
            return state
        }
    }
    
}
export default SaveButtonReducer;