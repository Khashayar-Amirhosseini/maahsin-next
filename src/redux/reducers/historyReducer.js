const { historyActionType } = require("../types");
const HistoryInitialState={
    history:null
};
const HistoryReducer=(state=HistoryInitialState,action)=>{
    switch (action.type){
        case historyActionType.UPDATE_HISTORY:{
            return {...state,history:action.history}
        }
        default:{
            return state
        }
    }
}
export default HistoryReducer;
