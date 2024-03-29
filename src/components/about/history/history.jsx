import { Box, Button, CircularProgress, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import HistoryReducer from "@/redux/reducers/historyReducer";
import axios from "axios";
import { updateHistory } from "@/redux/action/HistoryAction";
import * as yup from 'yup';
import SubmitFeedBacks from "../../submitFeedbacks/SubmitFeedBacks";
import EditButton from "../../editButton/EditButton";
import SaveButton from "../../saveButton/SaveButton";
import EditModal from "../../editModal/EditModal";
import { openModal } from "@/redux/action/editModelAction";
import { isChanged, isSending } from "@/redux/action/saveButtonAction";
import { update, updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { updateEntity } from "@/redux/action/entityAction";

const History = () => {  
    const {Address}=useSelector(state=>state.AddressReducer);
    const dispatch=useDispatch();
    const {HistoryInf}=useSelector((state)=>state.HistoryReducer)
    const{User}=useSelector(state=>state.UserReducer)
    const [isSaved, setIsSaved]=useState(false)
    
    const child=
    <TextField required 
        id="standard-basic" 
        label="تاریخچه" 
        multiline 
        variant="standard"
        rows={4}
        defaultValue={HistoryInf.description}
        onChange={e=> onChangeHandler(e)}
    />
    const submitHandler='history'
    const handleEdit=()=>{
        dispatch(updateEntity(HistoryInf))
        dispatch(updateFeedBack({errors:[],success:[]}));
        dispatch(isSending(false))
        dispatch(openModal("history",HistoryInf[0].id));
    }
    return ( 
        <>
        <Grid container>
            <Grid item textAlign={'justify'}>
                <Typography>{HistoryInf[0].description}</Typography>
            </Grid>
            <EditButton user={User}  onClick={e=>handleEdit()}/>
        </Grid>
      
        </>
     );
}
 
export default History;

