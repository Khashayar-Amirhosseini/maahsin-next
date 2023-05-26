import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import EditButton from '../editButton/EditButton';
import AddButton from '../addButton/addButton';
import DeleteButton from '../deleteButton/deleteButton';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { openModal } from "@/redux/action/editModelAction";
import { updateEntity } from "@/redux/action/entityAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { isSending } from "@/redux/action/saveButtonAction";
import { v4 as uuidv4 } from 'uuid';
import { addServices, removeService, updateService } from '@/redux/action/serviceAction';
import serviceImage from "../../assets/img/image.png"
import { useEffect } from 'react';
import { addSubServices, updateCluster } from '@/redux/action/clusterAction';
import ServiceReducer from '@/redux/reducers/serviceReducer';

const Subservice = (props) => {
    const {serviceId,user,mainService}=props;
    const newService=[{id:0,title:"عنوان",description:"شرح خدمت",user:{name:"",family:user.userInf.family},date:new Date,state:'inactive',mainServiceId:mainService?mainService.id:0,image:serviceImage.src}]
    const dispatch=useDispatch();
    const {Services}=useSelector(state=>state.ServiceReducer);
    let serviceInfo=Services.filter(s=>s.id===serviceId)[0]
    const handleAdd=()=>{
        const index=Services.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addServices(newService))
            dispatch(updateEntity(Services.concat(newService)));
            dispatch(addSubServices(mainService.id,newService));
            dispatch(openModal("service",newService[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    const handleDelete=(i)=>{
        mainService.services=mainService.services.filter(s=>s.id!==i);
        dispatch(updateCluster(mainService))
        dispatch(removeService(i))
    }
    const handleEdit=()=>{
        dispatch(updateEntity(Services))
        dispatch(updateFeedBack({errors:[],success:[]}));
        dispatch(isSending(false))
        dispatch(openModal("service",serviceId));
    }
    
    return (
        <Grid container>
        <Grid container>
        <Card sx={{ width: '100%' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={serviceInfo.image}
                title={serviceInfo.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {serviceInfo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {serviceInfo.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">اشتراک</Button>
                <Button size="small">دریافت مشاوره</Button>
            </CardActions>
        </Card>
        </Grid>
        <Grid key={uuidv4()} marginTop={2} container item justifyContent={'center'}>
                <EditButton user={user}  onClick={e=>{handleEdit()}}/>
                {!(Services.findIndex(d=>d.id===0)>0)&&(<AddButton user={user} onClick={e=>{handleAdd()}} />)}
                <DeleteButton user={user} entity={Services} index={serviceId}  url={`/action/admin/deleteService.do?serviceId=${serviceInfo.id}`} onDelete={handleDelete}/>  
        </Grid>
        </Grid> 
     );
}
 
export default Subservice;