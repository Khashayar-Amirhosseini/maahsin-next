import { Grid, Typography } from "@mui/material";
import theme from "config/theme";
import style from './ServiceCard.module.css';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/action/editModelAction";
import EditButton from "../editButton/EditButton";
import { updateEntity } from "@/redux/action/entityAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { isSending } from "@/redux/action/saveButtonAction";
import AddButton from "../addButton/addButton";
import DeleteButton from "../deleteButton/deleteButton";
import { addClusters, removeCluster } from "@/redux/action/clusterAction";
import serviceImage from "../../assets/img/image.png"
import { v4 as uuidv4 } from 'uuid';
import { addServices } from "@/redux/action/serviceAction";



const ServiceCard = (props) => {
    const{clusterInfo,link,name,services,user}=props
    const newCluster=[{id:0,title:"عنوان",description:"شرح خدمت",image:serviceImage.src,services:[{id:0,title:"",description:"",user:{name:"",family:""},date:new Date,image:serviceImage.src}],user:{name:"",family:""},date:new Date}];
    const dispatch=useDispatch();
    const {Clusters}=useSelector(state=>state.ClusterReducer);
    const handleAdd=()=>{
        const index=Clusters.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addClusters(newCluster));
            dispatch(updateEntity(Clusters.concat(newCluster)))
            dispatch(openModal("cluster",newCluster[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    const handleDelete=(i)=>{
        dispatch(removeCluster(i))
    }
    return (
        <Grid container key={uuidv4()} item md={3} >
            <Grid container key={uuidv4()} item justifyContent={'center'} >
                <div key={uuidv4()} className={`${style.ih_item} ${style.square} ${style.effect4}`}>
                    <a href="#">
                        <div key={uuidv4()} className={clusterInfo.img}>
                           <img key={uuidv4()} src={clusterInfo.image} alt="img"/>
                        </div>
                        <div key={uuidv4()} className={style.mask1}></div>
                        <div key={uuidv4()} className={style.mask2}></div>
                        <div key={uuidv4()} className={style.info} style={{background:theme.palette.primary.transprate}}>
                            <Typography variant={"h3"} style={{color:theme.palette.secondary.main}}>{clusterInfo.title}</Typography>
                            <Grid key={uuidv4()} container flexDirection={'column'} alignItems={'start'} >
                                <ul style={{listStyle:'none',margin:2}}>
                                    {clusterInfo.services.map(s=>{
                                        return(<li key={uuidv4()} style={{color:'white',textAlign:'right'}}>
                                                    <Typography key={uuidv4()} variant="p"> <DoneOutlinedIcon/> {s.title}</Typography>
                                                </li>)
                                    })}
                                </ul>
                            </Grid>
                            </div>
                    </a>
                
                </div>
            </Grid>
            <Grid key={uuidv4()} container item margin={1} justifyContent={'center'}>
              <DoneAllOutlinedIcon key={uuidv4()} style={{color:theme.palette.secondary.main}}/><Typography variant="h2" color={theme.palette.primary.main} style={{fontSize:'1rem'}}>{clusterInfo.title}</Typography>
            </Grid>
            <Grid key={uuidv4()} container item justifyContent={'center'}>
                <EditButton user={user}   onClick={e=>{dispatch(openModal("cluster",clusterInfo.id));dispatch(updateEntity(Clusters));dispatch(updateFeedBack({errors:[],success:[]}));dispatch(isSending(false))}}/>
                <AddButton user={user} onClick={e=>{handleAdd()}} />
                {!clusterInfo.services.length>0&&(<DeleteButton user={user} entity={Clusters} index={clusterInfo.id}  url={`/action/admin/deleteMainService.do?mainServiceId=${clusterInfo.id}`} onDelete={handleDelete}/>)}
            </Grid>
        </Grid>
    );
}

export default ServiceCard;