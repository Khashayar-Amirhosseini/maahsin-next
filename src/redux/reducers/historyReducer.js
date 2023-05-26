const { historyActionType } = require("../types");
const HistoryInitialState={
    HistoryInf:[]
};
const HistoryReducer=(state=HistoryInitialState,action)=>{
    switch (action.type){
        case historyActionType.UPDATE_HISTORY:{
            const newHistoryInf=[action.history]
            return {...state,HistoryInf:newHistoryInf}
        }
        default:{
            return state
        }
    }
}
export default HistoryReducer;
