import { doctorActionTypes } from "../types";

export const addDoctors=(newDoctor)=>{
    return({type:doctorActionTypes.ADD_DOCTORS,doctors:newDoctor})
};
export const removeDoctor=(index)=>{
    return({type:doctorActionTypes.REMOVE_DOCTOR,index:index})
}
export const updateDoctor=(doctor)=>{
    return({type:doctorActionTypes.UPDATE_DOCTOR,doctor:doctor})
}