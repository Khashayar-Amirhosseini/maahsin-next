import { serviceActionTypes } from "../types";

export const addServices=(newSerives)=>{
    return({type:serviceActionTypes.ADD_SERVICES,services:newSerives})
}
export const removeService=(index)=>{
    return({type:serviceActionTypes.REMOVE_SERVICE,index:index})
}
export const updateService=(service)=>{
    return({type:serviceActionTypes.UPDATE_SERVICE,service:service})
}