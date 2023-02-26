
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
    return(
        <>
        <Grid  container item md={6}>
            <Grid container sx={{flexDirection:'column',alignItems:'center'}}  item md={6} style={{padding:"10px"}}>
                <img style={{width:200}} src={doctorInfo.image}/>
            </Grid>
            <Grid item md={6}>
                <Typography variant="h4" className={style.h4}>{doctorInfo.name} {doctorInfo.family}</Typography>
                <Typography  >شماره پروانه: {doctorInfo.medicalId}</Typography>
                <Typography  >{doctorInfo.about}</Typography>
                <EditButton user={user}   onClick={e=>{dispatch(openModal("doctor",doctorInfo.id));dispatch(updateFeedBack({errors:[],success:[]}))}} />
            </Grid>
        </Grid>
        </>
    )
}

export default Doctrors;