
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import style from  './about.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react';





const About = (props) => {
    
    return (
        <>
       
            <div className="main_title">
                <h2>کلینیک  زیبایی ماه سین</h2>
                <img className={style.headerPic} src={'img/heading-cream.svg'} />
            </div>
            <Grid  container justifyContent={"center"} >
                <Grid item xs={11} md={11} >
                    <Accordion  defaultExpanded={true}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}                
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <Typography>تاریخچه</Typography>
                    </AccordionSummary>
                        <AccordionDetails><Typography>{props.history.description}</Typography></AccordionDetails>
                    </Accordion>
            </Grid>
            </Grid>
        </>
    );

}



export default About;