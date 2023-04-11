import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";

const Servicees = () => {
    const {Clusters}=useSelector(state=>state.ClusterReducer)
    console.log(Clusters);
    return ( 
        <Grid container >
            <Grid container justifyContent={'center'} flexDirection={'column'} alignContent={'center'} >
                <h2 style={{textAlign:'center'}}>خدمات کلینیک ماه سین</h2>
                <img style={{width:'20rem'}} src={'img/heading-cream.svg'} />
            </Grid>
            <Grid container justifyContent={'center'}>
                {Clusters.map(s=>{
                    return (<ServiceCard link={s.image} name={s.title} services={s.services}/>)
                })}
               
            </Grid>
        </Grid>
     );
}
 
export default Servicees;