import { doctorActionTypes } from "../types";

export const addDoctors=(newDoctor)=>{
    return({type:doctorActionTypes.ADD_DOCTORS,doctors:newDoctor})
};