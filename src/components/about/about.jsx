
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import style from  './about.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react';
import { store } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Doctrors from '../doctor/doctor';
import { addDoctors } from '@/redux/types';
import { v4 as uuidv4 } from 'uuid';
import History from './history/history';






const About = (props) => {
    const {doctors}=useSelector((state)=>state.DoctorReducer);
    const {User}=useSelector(state=>state.UserReducer)
    return (
        <>
            <div  className="main_title">
                <h2>کلینیک  زیبایی ماه سین</h2>
                <img className={style.headerPic} src={'img/heading-cream.svg'} />
            </div>
            <Grid  container justifyContent={"center"} >
                <Grid item xs={11} md={11} >
                    <Accordion key={uuidv4()} defaultExpanded={true}>
                        <AccordionSummary
                        key={uuidv4()}
                        expandIcon={<ExpandMoreIcon/>}                
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <Typography>تاریخچه</Typography>
                    </AccordionSummary >
                        <AccordionDetails key={uuidv4()}>
                             <History/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion key={uuidv4()} defaultExpanded={false}>
                        <AccordionSummary
                        key={uuidv4()}
                        expandIcon={<ExpandMoreIcon/>}                
                        aria-controls="panel2a-content"
                        id="panel1a-header">
                            <Typography>کادر پزشکی</Typography>
                    </AccordionSummary>
                        <AccordionDetails key={uuidv4()}>
                            {doctors.map(doc=><Doctrors user={User} key={uuidv4()} doctorInfo={doc}/>)}
                        </AccordionDetails>
                    </Accordion>         
            </Grid>
            </Grid>

        </>
    );

}



export default About;