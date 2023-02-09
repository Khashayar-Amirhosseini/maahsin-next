import { Box, Button, CircularProgress, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import HistoryReducer from "@/redux/reducers/historyReducer";
import axios from "axios";
import { updateHistory } from "@/redux/action/HistoryAction";
import * as yup from 'yup';
import SubmitFeedBacks from "../submitFeedbacks/SubmitFeedBacks";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    direction: 'rtl'
  };
const History = () => {
    const {Address}=useSelector(state=>state.AddressReducer);
    const dispatch=useDispatch();
    const {HistoryInf}=useSelector((state)=>state.HistoryReducer)
    const{User}=useSelector(state=>state.UserReducer)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isChanged,setIsChange]=useState(false)
    const [isSaved, setIsSaved]=useState(false)
    const[errors,setErrors]=useState([])
    const [isSending,setIsSending]=useState(false)
    const onChangeHandler=(e)=>{
        dispatch(updateHistory({...HistoryInf,description:e.target.value}))
        setIsChange(true)
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
        setIsSending(true)   
            try{
                const response=await axios({
                method: "get",
                url: `${Address}/action/history/historySave.do?description=${HistoryInf.description}&userId=${User.userInf.id}`,
                headers:{'Access-Token':`${User.token}`}
                }) 
                setIsSaved(true)
                setIsSending(false)
                setIsChange(false)
            }
            catch(e){
                console.log(e)
                if(e.response){
                if(e.response.status===700){
                    setErrors(["دسترسی مورد نیاز فراهم نشده است."]) 
                }}
                else{
                    setErrors(["مشکل در سرور پیش اومده"])  
                }
               setIsSending(false)          
            }   
        }
        
    }

    return ( 
        <>
        <Grid container>
            <Grid item textAlign={'justify'}>
                <Typography>{HistoryInf.description}</Typography>
            </Grid>
            <Grid>
            {User.isAuthenticated&&(<Grid item>
                <Button variant="outlined" color='primary' onClick={handleOpen} >
                    <EditOutlinedIcon/>
                </Button>
            </Grid>)}
            </Grid>
        </Grid>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography variant="h4">ویرایش</Typography>
            <Grid container spacing={2}>
                <Grid sx={{width:'100%'}} item>
                    <FormControl sx={{width:'100%'}}>
                        <TextField required 
                        id="standard-basic" 
                        label="تاریخچه" 
                        multiline 
                        variant="standard"
                        rows={4}
                        value={HistoryInf.description}
                        onChange={e=> onChangeHandler(e)}/>
                    </FormControl> 
                </Grid>
                <SubmitFeedBacks success={isSaved?[User.userInf.family,new Date((HistoryInf.date)).toLocaleDateString('fa-IR')]:[]} errors={errors}/>
                <Grid item sx={{width:'100%'}} textAlign='center'>
                    <Button size="small" variant="outlined" color={isChanged?'error':'primary'} onClick={submitHandler} disabled={isSending}>
                            {isSending?<CircularProgress/>:<SaveIcon/>}
                    </Button> 
                </Grid>
            </Grid>     
        </Box>
      </Modal>
        </>
     );
}
 
export default History;