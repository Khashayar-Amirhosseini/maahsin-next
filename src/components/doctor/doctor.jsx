
import { useState,useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import axios from "axios";
import { number } from "yup";
import { Grid, Typography } from "@mui/material";
import secondary from '../../../config/theme'
import style from '../doctor/doctor.module.css'

const Doctrors = (props) => {
    const info= props.doctorInfo;

    return(
        <Grid  container item md={6}>
            <Grid   item md={6}>
                <img  src={info.image}/>
            </Grid>
            <Grid item md={6}>
                <Typography variant="h4" className={style.h4}>{info.name} {info.family}</Typography>
                <Typography  >شماره پروانه: {info.medicalId}</Typography>
                <Typography  >{info.about}</Typography>
            </Grid>
        </Grid>
    )
}

export default Doctrors;