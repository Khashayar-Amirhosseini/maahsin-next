
import { useState,useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import axios from "axios";
import { number } from "yup";
import { Grid, TextField, Typography } from "@mui/material";
import secondary from '../../../config/theme'
import style from '../doctor/doctor.module.css'
import EditButton from "../editButton/EditButton";
import EditModal from "../editModal/EditModal";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/action/editModelAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { isChanged } from "@/redux/action/saveButtonAction";

const Doctrors = (props) => {
    const {user,doctorInfo}=props;
    const dispatch=useDispatch()
    const DoctorsubmitHandler=(
    )=>{};
    
    const child=
        <TextField required 
        id="standard-basic" 
        label="شسیبلیسبل" 
        multiline 
        variant="standard"
        rows={4}
        onChange={e=> dispatch(isChanged(true))}/>
    return(
        <>
        <Grid  container item md={6}>
            <Grid   item md={6}>
                <img  src={doctorInfo.image}/>
            </Grid>
            <Grid item md={6}>
                <Typography variant="h4" className={style.h4}>{doctorInfo.name} {doctorInfo.family}</Typography>
                <Typography  >شماره پروانه: {doctorInfo.medicalId}</Typography>
                <Typography  >{doctorInfo.about}</Typography>
                <EditButton user={user}  submitHandler={DoctorsubmitHandler} onClick={e=>{dispatch(openModal(child));dispatch(updateFeedBack({errors:[],success:[]}))}} />
            </Grid>
        </Grid>
        <EditModal>
            
        </EditModal>
        </>
    )
}

export default Doctrors;