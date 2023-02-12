const { historyActionType } = require("../types");
const HistoryInitialState={
    HistoryInf:{}
};
const HistoryReducer=(state=HistoryInitialState,action)=>{
    switch (action.type){
        case historyActionType.UPDATE_HISTORY:{
            return {...state,HistoryInf:action.history}
        }
        default:{
            return state
        }
    }
}
export default HistoryReducer;
