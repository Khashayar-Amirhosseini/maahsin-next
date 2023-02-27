import { Button, Grid } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditModal from "../editModal/EditModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/action/editModelAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";

const AddButton = (props) => {
    const {user,onClick}=props
    const [isSaved, setIsSaved]=useState(false);
    const dispatch=useDispatch()
    return (
        <>
        <Grid item>
                {user.userInf.viewer && (<Grid item>
                    <Button style={{padding:0,height:0,width:30}} color='primary' onClick={onClick}  >
                        <AddCircleOutlineOutlinedIcon onClick={(e) => { dispatch(openModal()); dispatch(updateFeedBack({ errors: [], success: [] })) }} />
                    </Button>
                </Grid>)}
            </Grid>
            <EditModal  isSaved={isSaved}/>
        </>
      );
}
 
export default AddButton;