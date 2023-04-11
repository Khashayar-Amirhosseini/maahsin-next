import AddButton from "@/components/addButton/addButton";
import DeleteButton from "@/components/deleteButton/deleteButton";
import EditButton from "@/components/editButton/EditButton";
import { addAcheivements, removeAcheivement } from "@/redux/action/achievementAction";
import { openModal } from "@/redux/action/editModelAction";
import { updateEntity } from "@/redux/action/entityAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { useDispatch, useSelector } from "react-redux";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import { Typography } from "@mui/material";
import { isSending } from "@/redux/action/saveButtonAction";

const Acheivement = (props) => {
    const {user,acheivementInfo}=props;
    const newAcheivement=[{id:0,description:'دستاورد',date:new Date().valueOf(),user:{family:user.userInf.family},state:'active'}]
    const {Acheivements}=useSelector(state=>state.AcheivementReducer);
    const dispatch=useDispatch()
    const handleAdd=()=>{
        const index=Acheivements.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addAcheivements(newAcheivement));
            dispatch(updateEntity(Acheivements.concat(newAcheivement)))
            dispatch(openModal("acheivement",newAcheivement[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    const handleDelete=(i)=>{
        dispatch(removeAcheivement(i))
    }

    return (
            (acheivementInfo.state==='active'||user.userInf.viewer)&&(
                <li style={{display:'flex'}}><ArrowLeftOutlinedIcon color="secondary"/><Typography>{acheivementInfo.description}</Typography>
                    <EditButton user={user}   onClick={e=>{dispatch(openModal("acheivement",acheivementInfo.id));dispatch(updateEntity(Acheivements));dispatch(updateFeedBack({errors:[],success:[]}));dispatch(isSending(false))}}/>
                    <AddButton user={user} onClick={e=>{handleAdd()}} />
                    <DeleteButton user={user} index={acheivementInfo.id} entity={Acheivements} url={`/action/admin/deleteAchievement.do?achievementId=${acheivementInfo.id}`} onDelete={handleDelete}/> 
                </li>
            )
     );
}
 
export default Acheivement;