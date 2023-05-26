
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import style from  './about.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react';
import { store } from '@/redux/store';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Doctrors from '../doctor/doctor';
import { addDoctors } from '@/redux/types';
import { v4 as uuidv4 } from 'uuid';
import History from './history/history';
import Goal from './goals/goal'
import Policy from './policy/policy';
import Acheivement from './acheivements/Acheivement';
import Carousel from 'react-material-ui-carousel';
import { addPictures } from '@/redux/action/pictureAction';
import useSWRInfinite from 'swr'
import axios from 'axios';
import { date } from 'yup';
import { isSending } from '@/redux/action/saveButtonAction';
import Picture from './pictures/Picture';



const About = (props) => {
    const store=useStore()
    const {doctors}=useSelector((state)=>state.DoctorReducer);
    const {Goals}=useSelector((state)=>state.GoalReducer)
    const {User}=useSelector(state=>state.UserReducer);
    const {Policies}=useSelector(state=>state.PolicyReducer);
    const {Acheivements}=useSelector(state=>state.AcheivementReducer);
    const {Pictures}=useSelector(state=>state.PictureReducer);
    const dispatch=useDispatch()
    const {Address}=props
    const url=`${Address}/action/guest/findAllPictures.do?`;
    const{data,error,isLoading}=useSWRInfinite(url,axios);
   // !isLoading&&(dispatch(addPictures(data.data)))
    useEffect(()=>{
        !isLoading&&(dispatch(addPictures(data.data)))  ;
    },[isLoading])
    const [screenWidth,setScreenWidth]=useState(0)
    useEffect(() => {
        if (typeof window != 'undefined') {
            setScreenWidth(window.innerWidth)
        }  
      }, [])    
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
                            <Grid container>
                            {doctors.map(doc=><Doctrors user={User} key={uuidv4()} doctors={doctors} doctorInfo={doc}/>)}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion key={uuidv4()} defaultExpanded={false}>
                        <AccordionSummary
                        key={uuidv4()}
                        expandIcon={<ExpandMoreIcon/>}                
                        aria-controls="panel2a-content"
                        id="panel1a-header">
                            <Typography>اهداف</Typography>
                    </AccordionSummary>
                        <AccordionDetails key={uuidv4()}>
                            <Grid container spacing={1}>
                            {Goals.map(goal=><Goal user={User} key={uuidv4()} goalInfo={goal}/>)}
                            </Grid>
                        </AccordionDetails>
                    </Accordion> 
                    <Accordion key={uuidv4()} defaultExpanded={false}>
                        <AccordionSummary
                        key={uuidv4()}
                        expandIcon={<ExpandMoreIcon/>}                
                        aria-controls="panel2a-content"
                        id="panel1a-header">
                            <Typography>خطی مشی</Typography>
                        </AccordionSummary>
                        <AccordionDetails key={uuidv4()}>
                            <Grid container spacing={1}>
                                <ul style={{listStyle:'none'}}>
                                    {Policies.map(policy=><Policy user={User} key={uuidv4()} policyInfo={policy}/>)}
                                </ul>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>   
                    <Accordion key={uuidv4()} defaultExpanded={false}>
                        <AccordionSummary
                        key={uuidv4()}
                        expandIcon={<ExpandMoreIcon/>}                
                        aria-controls="panel2a-content"
                        id="panel1a-header">
                            <Typography>دستاوردها</Typography>
                        </AccordionSummary>
                        <AccordionDetails key={uuidv4()}>
                            <Grid container spacing={1}>
                                <ul style={{listStyle:'none'}}>
                                    {Acheivements.map(achievement=><Acheivement user={User} key={uuidv4()} acheivementInfo={achievement}/>)}
                                </ul>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion key={uuidv4()} defaultExpanded={false}>
                        <AccordionSummary
                        key={uuidv4()}
                        expandIcon={<ExpandMoreIcon/>}                
                        aria-controls="panel2a-content"
                        id="panel1a-header">
                            <Typography>تصاویر</Typography>
                        </AccordionSummary>
                        <AccordionDetails key={uuidv4()}>
                            <Grid container spacing={1} justifyContent={'center'} >
                              
                                    <Carousel sx={{marginTop:5,width:'100%',height:'70%'}} >
                                        {Pictures.map(p=><img key={uuidv4()} style={{width:'100%'}} height ={screenWidth/2}src={p.link}/>)}
                                    </Carousel>
                                <Grid container item >
                                
                                    {
                                        Pictures.map(p=>
                                            <Picture user={User} key={uuidv4()} pictureInfo={p}/>
                                        )
                                    }
                           
                                </Grid>
                                
                            </Grid>

                        </AccordionDetails>
                    </Accordion>        
            </Grid>
            </Grid>

        </>
    );

}



export default About;