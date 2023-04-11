import AddButton from "@/components/addButton/addButton";
import DeleteButton from "@/components/deleteButton/deleteButton";
import EditButton from "@/components/editButton/EditButton";
import { openModal } from "@/redux/action/editModelAction";
import { updateEntity } from "@/redux/action/entityAction";
import { addPictures, removePicture } from "@/redux/action/pictureAction";
import { isSending } from "@/redux/action/saveButtonAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import image from './../../../assets/img/image.png';

const Picture = (props) => {

    const {user,pictureInfo}=props;
    const newPicture=[{id:0,link:image.src,date:new Date().valueOf(),user:{family:user.userInf.family}}]
    const {Pictures}=useSelector(state=>state.PictureReducer);
    const dispatch=useDispatch()
    const handleAdd=()=>{
        const index=Pictures.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addPictures(newPicture));
            dispatch(updateEntity(Pictures.concat(newPicture)))
            dispatch(openModal("picture",newPicture[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    const handleDelete=(i)=>{
        dispatch(removePicture(i))
    }

    return (
            (user.userInf.viewer)&&(
                    <Grid style={{padding:10}} item md={3}>
                        <Grid container item >
                            <img style={{width:'100%',height:250}} src={pictureInfo.link} />
                        </Grid>
                        <Grid container item justifyContent={'center'}>
                            <AddButton user={user} onClick={e=>{handleAdd()}} />
                            <DeleteButton user={user} index={pictureInfo.id} entity={Pictures} url={`/action/admin/deletePicture.do?pictureId=${pictureInfo.id}`} onDelete={handleDelete}/> 
                        </Grid>
                    </Grid>
 
            )
     );
}
 
export default Picture;