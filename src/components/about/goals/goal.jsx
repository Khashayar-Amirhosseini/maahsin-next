import EditButton from "@/components/editButton/EditButton";
import { openModal } from "@/redux/action/editModelAction";
import { updateEntity } from "@/redux/action/entityAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
const Goal = (props) => {
    const {goalInfo,user}=props;
    const {Goals}=useSelector(state=>state.GoalReducer)
    const dispatch=useDispatch()
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
                </Card>
                <EditButton user={user}   onClick={e=>{dispatch(openModal("goal",goalInfo.id));dispatch(updateEntity(Goals));dispatch(updateFeedBack({errors:[],success:[]}))}}/>
            </Grid>
        )
     );
}
 
export default Goal;