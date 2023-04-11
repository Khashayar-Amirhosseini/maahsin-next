import { Grid, Typography } from "@mui/material";
import { typography } from "@mui/system";
import theme from "config/theme";
import style from './ServiceCard.module.css';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';


const ServiceCard = (props) => {
    const{link,name,services}=props
    return (
        <Grid container item md={3} >
            <Grid container item>
                <div className={`${style.ih_item} ${style.square} ${style.effect4}`}>
                    <a href="#">
                        <div className={style.img}>
                           <img src={link} alt="img"/>
                        </div>
                        <div class={style.mask1}></div>
                        <div class={style.mask2}></div>
                        <div class={style.info} style={{background:theme.palette.primary.transprate}}>
                            <typography variant={"h3"} style={{color:theme.palette.secondary.main}}>{name}</typography>
                            <Grid container flexDirection={'column'} alignItems={'start'} >
                                <ul style={{listStyle:'none'}}>
                                    {services.map(s=>{
                                        return(<li  style={{color:'white',textAlign:'right'}}>
                                                    <Typography variant="p"> <DoneOutlinedIcon/> {s.title}</Typography>
                                                </li>)
                                    })}
                                </ul>
                            </Grid>
                            </div>
                    </a>
                </div>
            </Grid>
            <Grid container item justifyContent={'center'}>
              <DoneAllOutlinedIcon style={{color:theme.palette.secondary.main}}/><Typography variant="h2" color={theme.palette.primary.main} style={{fontSize:'1rem'}}>{name}</Typography>
            </Grid>

        </Grid>
    );
}

export default ServiceCard;