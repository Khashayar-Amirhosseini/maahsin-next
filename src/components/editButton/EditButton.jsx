import { Button, Grid, TextField } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/action/editModelAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import EditModal from "../editModal/EditModal";
import { useState } from "react";

const EditButton = (props) => {
    const { user, onClick } = props;
    const [isSaved, setIsSaved]=useState(false);
    const dispatch = useDispatch();
    return (
        <>
            <Grid container item>
                {user.userInf.viewer && (<Grid item>
                    <Button variant="outlined" color='primary' onClick={onClick} >
                        <EditOutlinedIcon onClick={(e) => { dispatch(openModal()); dispatch(updateFeedBack({ errors: [], success: [] })) }} />
                    </Button>
                </Grid>)}
            </Grid>
            <EditModal  isSaved={isSaved}/>
        </>

    );
}

export default EditButton;