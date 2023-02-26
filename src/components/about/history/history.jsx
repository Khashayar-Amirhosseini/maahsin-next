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

const History = () => {  
    const {Address}=useSelector(state=>state.AddressReducer);
    const dispatch=useDispatch();
    const {HistoryInf}=useSelector((state)=>state.HistoryReducer)
    const{User}=useSelector(state=>state.UserReducer)
    const [isSaved, setIsSaved]=useState(false)
    
    
    
    /*const historySubmitHandler= async(e)=>{
        console.log(HistoryInf.description)
        dispatch(updateFeedBack({errors:[],success:[]}))
        e.preventDefault();
        const result=await validate();
        if(result&&!isSaved){
        dispatch(isSending(true))  
            try{
                const response=await axios({
                method: "get",
                url: `${Address}/action/history/historySave.do?description=${HistoryInf.description}&userId=${User.userInf.id}`,
                headers:{'Access-Token':`${User.token}`}
                }) 
                dispatch(isChanged(false))
                dispatch(updateFeedBack({errors:[],success:[User.userInf.family,new Date((HistoryInf.date)).toLocaleDateString('fa-IR')]}))
            }
            catch(e){
                if(e.response){
                if(e.response.status===700){
                    dispatch(updateFeedBack({errors:["دسترسی مورد نیاز فراهم نشده است."],success:[]}))
                }}
                else{
                    dispatch(updateFeedBack({errors:["مشکل در سرور پیش اومده"],success:[]}))
                }              
            }
            dispatch(isSending(false))   
        }  
    }*/
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
    return ( 
        <>
        <Grid container>
            <Grid item textAlign={'justify'}>
                <Typography>{HistoryInf.description}</Typography>
            </Grid>
            <EditButton user={User} onClick={e=>{dispatch(openModal(submitHandler)); dispatch(updateFeedBack({errors:[],success:[]}));}}/>
        </Grid>
      
        </>
     );
}
 
export default History;

