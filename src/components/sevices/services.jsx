import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { v4 as uuidv4 } from 'uuid';
import Subservice from "./Subservice";
import { addServices } from "@/redux/action/serviceAction";
import { useEffect } from "react";
import serviceImage from "../../assets/img/image.png"


const Servicees = (props) => {
    const {Clusters}=useSelector(state=>state.ClusterReducer);
    const dispatch=useDispatch();
    const {User}=useSelector(state=>state.UserReducer);
    return ( 
        <Grid container >
            <Grid container justifyContent={'center'} flexDirection={'column'} alignContent={'center'} >
                <h2 style={{textAlign:'center'}}>خدمات کلینیک ماه سین</h2>
                <img style={{width:'20rem'}} src={'img/heading-cream.svg'} />
            </Grid>
            <Grid container justifyContent={'center'}>
                {Clusters.map(s=>{
                    return (<ServiceCard key={uuidv4()} user={User} clusterInfo={s}/>)
                })}
            </Grid>
            <Grid container maxWidth={'80%'} margin={'auto'}>
            {Clusters.map(c=>{
                return (
                    c.id!==0&&(
                    <Grid container marginTop={5}> 
                    <Typography variant="h4">{c.title}</Typography> 
                    <Grid container spacing={0.5} >          
                        {c.services.map(s=>{
                            return(
                                <Grid item md={4}  sm={6} xs={12}>
                                    <Subservice serviceId={s.id} mainService={c} user={User}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                    </Grid>)
                )})
            }   
            </Grid>
        </Grid>
     );
}
 
export default Servicees;