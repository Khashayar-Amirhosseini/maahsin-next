import AddButton from "@/components/addButton/addButton";
import DeleteButton from "@/components/deleteButton/deleteButton";
import EditButton from "@/components/editButton/EditButton";
import { openModal } from "@/redux/action/editModelAction";
import { updateEntity } from "@/redux/action/entityAction";
import { addGoals, removeGoal } from "@/redux/action/goalAction";
import { isSending } from "@/redux/action/saveButtonAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageGoal from './../../../assets/img/goal.jpg';
const Goal = (props) => {
    const {goalInfo,user}=props;
    const newGoal=[{id:0,description:'شرح هدف',date:new Date().valueOf(),user:{family:user.userInf.family},image:imageGoal.src,state:'active'}];
    useEffect(()=>{
        if(goalInfo.image===null){
            goalInfo.image=imageGoal.src;
        }
    },[])
    const {Goals}=useSelector(state=>state.GoalReducer)
    const dispatch=useDispatch()
    const handleAdd=()=>{
        const index=Goals.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addGoals(newGoal));
            dispatch(updateEntity(Goals.concat(newGoal)))
            dispatch(openModal("goal",newGoal[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    const handleDelete=(i)=>{
        dispatch(removeGoal(i))
    }
    return ( 
        (goalInfo.state==='active'||user.userInf.viewer)&&(
            <Grid item md={3} >
                <Card>
                    <CardMedia component='img'
                                height="140"
                                image={goalInfo.image}
                                alt={`تصویر هدف با عنوان  ${goalInfo.description}`}/>
                    <CardContent sx={{textAlign:'center'}}>
                        <Typography variant="h6">{goalInfo.description}</Typography>
                    </CardContent>
                    <Grid container sx={{justifyContent:'center'}}>
                    <EditButton user={user}   onClick={e=>{dispatch(openModal("goal",goalInfo.id));dispatch(updateEntity(Goals));dispatch(updateFeedBack({errors:[],success:[]}));dispatch(isSending(false))}}/>
                    <AddButton user={user} onClick={e=>{handleAdd()}} />
                    <DeleteButton user={user} entity='goal' index={goalInfo.id}  url={`/action/admin/deleteGoal.do?goalId=${goalInfo.id}`} onDelete={handleDelete}/>
                    </Grid>
                </Card>
                
            </Grid>
        )
     );
}
 
export default Goal;