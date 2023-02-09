import { Box, Button, CircularProgress, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import HistoryReducer from "@/redux/reducers/historyReducer";
import axios from "axios";
import { updateHistory } from "@/redux/action/HistoryAction";
import * as yup from 'yup';
import SubmitFeedBacks from "../submitFeedbacks/SubmitFeedBacks";
import EditButton from "../editButton/EditButton";
import SaveButton from "../saveButton/SaveButton";
import EditModal from "../editModal/EditModal";
import { openModal } from "@/redux/action/editModelAction";
import { isChanged, isSending } from "@/redux/action/saveButtonAction";

const History = () => {
    const {Address}=useSelector(state=>state.AddressReducer);
    const dispatch=useDispatch();
    const {HistoryInf}=useSelector((state)=>state.HistoryReducer)
    const{User}=useSelector(state=>state.UserReducer)
    //const [isChanged,setIsChange]=useState(false)
    const [isSaved, setIsSaved]=useState(false)
    const[errors,setErrors]=useState([])
    //const [isSending,setIsSending]=useState(false)
    const [open, setOpen] = useState(false);
    const onChangeHandler=(e)=>{
        dispatch(updateHistory({...HistoryInf,description:e.target.value}));
        dispatch(isChanged(true))
    }
    let schema=yup.object().shape({
        description:yup.string().required('فیلد تاریخچه رو نباید خالی بذاری.')
    })
    const validate=async()=>{
        try{
           const result= await schema.validate(HistoryInf,{abortEarly:false});
            return result
        }
        catch(error){
           setErrors(error.errors)  
        }
       
    }
    const submitHandler= async(e)=>{
        setErrors([])
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
            }
            catch(e){
                if(e.response){
                if(e.response.status===700){
                    setErrors(["دسترسی مورد نیاز فراهم نشده است."]) 
                }}
                else{
                    setErrors(["مشکل در سرور پیش اومده"])  
                }
                         
            }
            dispatch(isSending(false))   
        }
        
    }

    return ( 
        <>
        <Grid container>
            <Grid item textAlign={'justify'}>
                <Typography>{HistoryInf.description}</Typography>
            </Grid>
            <EditButton user={User} onClick={e=>{dispatch(openModal())}}/>
        </Grid>
        <EditModal isSaved={isSaved}
            errors={errors}
            success={[User.userInf.family,new Date((HistoryInf.date)).toLocaleDateString('fa-IR')]}
            submitHandler={submitHandler}>
                <TextField required 
                        id="standard-basic" 
                        label="تاریخچه" 
                        multiline 
                        variant="standard"
                        rows={4}
                        value={HistoryInf.description}
                        onChange={e=> onChangeHandler(e)}/>
        </EditModal>
        </>
     );
}
 
export default History;