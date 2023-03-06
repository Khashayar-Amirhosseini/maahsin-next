
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
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/action/editModelAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { isChanged } from "@/redux/action/saveButtonAction";
import AddButton from "../addButton/addButton";
import { addDoctors } from "@/redux/action/doctorAction";
import imageProfile from './../../assets/img/profile.jpg'
import DeleteButton from "../deleteButton/deleteButton";
import { updateEntity } from "@/redux/action/entityAction";


const Doctrors = (props) => {
    const {user,doctorInfo}=props;
    const {doctors}=useSelector(state=>state.DoctorReducer);
    const dispatch=useDispatch();
   const newDoctor=[{id:0,name:'ناشناس',family:'',medicalId:'',about:'تعریف نشده',date:new Date().valueOf(),user:{family:user.userInf.family},image:imageProfile.src,state:'active'}];
    const handleAdd=()=>{
        const index=doctors.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addDoctors(newDoctor));
            dispatch(openModal("doctor",newDoctor[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    return(
        <>
        {(doctorInfo.state==='active'||user.userInf.viewer)&&(<Grid  container item md={6}>
            <Grid container sx={{flexDirection:'column',alignItems:'center'}}  item md={6} style={{padding:"10px"}}>
                <img style={{width:200}} src={doctorInfo.image}/>
            </Grid>
            <Grid item md={6}>
                <Typography variant="h4" className={style.h4}>{doctorInfo.name} {doctorInfo.family}</Typography>
                <Typography  >شماره پروانه: {doctorInfo.medicalId}</Typography>
                <Typography  >{doctorInfo.about}</Typography>
                <Grid container >
                    <EditButton user={user} onClick={e=>{dispatch(openModal("doctor",doctorInfo.id));dispatch(updateEntity(doctors));dispatch(updateFeedBack({errors:[],success:[]}))}} />
                    <AddButton user={user} onClick={e=>{handleAdd()}} />
                    <DeleteButton user={user} entity='doctor' index={doctorInfo.id}  url={`/action/admin/deleteDoctor.do?doctorId=${doctorInfo.id}`}/>
                </Grid>
            </Grid>
        </Grid>)}
        </>
    )
}

export default Doctrors;