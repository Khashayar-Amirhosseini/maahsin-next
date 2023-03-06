import { goalsActoinType } from "../types"

export const addGoals=(newGoals)=>{
    return ({type:goalsActoinType.ADD_GOALS,goals:newGoals})
}
export const updatGoals=(goal)=>{
    return({type:goalsActoinType.UPDATE_GOAL,goal:goal})
}
export const removeGoal=(index)=>{
    return({type:goalsActoinType.REMOVE_GOAL,index:index})
}