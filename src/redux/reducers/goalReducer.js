import { goalsActoinType } from "../types";

const goalInitialState={
    Goals:[]
}
const GoalReducer = (state=goalInitialState,action) => {
    switch(action.type){
        case goalsActoinType.ADD_GOALS:{
            return {...state,Goals:[...state.Goals].concat(action.goals)}
        }
        case goalsActoinType.UPDATE_GOAL:{
            const newGoal=[...state.Goals].filter(g=>g.id!==action.goal.id)
            newGoal.concat(action.goal)
            return{...state,Goals:newGoal}
        }
        case goalsActoinType.REMOVE_GOAL:{
            const newGoals=[...state.Goals].filter(g=>g.id!==action.index)
            return{...state,Goals:newGoals}
        }
        default:{
            return state;
        }
    }
}
 
export default GoalReducer;