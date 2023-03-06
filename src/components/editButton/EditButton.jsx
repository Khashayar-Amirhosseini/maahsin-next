import { Button, Grid, TextField } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/action/editModelAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import EditModal from "../editModal/EditModal";
import { useState } from "react";

const EditButton = (props) => {
    const { user, onClick,entity } = props;
    const {Open}=useSelector(state=>state.EditModalReducer);
    return (
        <>
            <Grid item>
                {user.userInf.viewer && (
                <Grid item>
                    <Button style={{padding:0,height:0,width:30}} color='primary' onClick={onClick} >
                        <EditOutlinedIcon/>
                    </Button>
                </Grid>)}
            </Grid>
            {Open &&(<EditModal entity={entity}/>)}
        </>

    );
}

export default EditButton;