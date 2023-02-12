import { Button, Grid,CircularProgress } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { update, updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { isChanged, isSending } from "@/redux/action/saveButtonAction";
import axios from "axios";


const SaveButton = (props) => {
    const {SubmitHandler}=useSelector(state=>state.EditModalReducer);
    const {IsSending,isChanged}=useSelector(state=>state.SaveButtonReducer);
    const {Address}=useSelector(state=>state.AddressReducer);
    const {Ischanged}=useSelector(state=>state.SaveButtonReducer);
    const {HistoryInf}=useSelector(state=>state.HistoryReducer);
    const {User}=useSelector(state=>state.UserReducer);
    const dispatch=useDispatch();
    const saveButtonSubmitHandeler=async(e)=>{  
        switch (SubmitHandler){
            case('history'):{
                historySubmitHandler(e)
            }
        }
    }
    //////////history////////////////////////
    let schema=yup.object().shape({
        description:yup.string().required('فیلد تاریخچه رو نباید خالی بذاری.')
    })
    const validate=async()=>{
        try{
           const result= await schema.validate(HistoryInf,{abortEarly:false});
            return result
        }
        catch(error){
            console.log(error)
            dispatch(updateFeedBack({errors:[error.errors],success:[]})) 
        }
       
    }
    const historySubmitHandler= async(e)=>{
       dispatch(updateFeedBack({errors:[],success:[]}))
        e.preventDefault();
        const result=await validate();
        if(result&&!Ischanged){
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
    } 

    
    ////////////////
    return (
        <Grid item sx={{ width: '100%' }} textAlign='center'>
            <Button size="small" variant="outlined" color={isChanged ? 'error' : 'primary'} onClick={saveButtonSubmitHandeler} disabled={IsSending}>
                {IsSending ? <CircularProgress /> : <SaveIcon />}
            </Button>
        </Grid>
    );
}

export default SaveButton;