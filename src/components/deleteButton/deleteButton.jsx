import { Button, Dialog, Grid, DialogTitle,DialogContent,DialogActions,DialogContentText, CircularProgress } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeDoctor } from "@/redux/action/doctorAction";
import { isSending } from "@/redux/action/saveButtonAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import SubmitFeedBacks from "../submitFeedbacks/SubmitFeedBacks";
import axios from "axios";

const DeleteButton = (props) => {
    const { user, url,index,entity } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const[isSuccessful,setIsSuccessful]=useState(false)
    const {Address}=useSelector(state=>state.AddressReducer);
    const {IsSending}=useSelector(state=>state.SaveButtonReducer);

    const handleClickOpen = () => {
        setOpen(true);
        dispatch(updateFeedBack({errors:[],success:[]}))
    };

    const handleClose = () => {
        setOpen(false);
        if(isSuccessful){
            switch(entity){
                case 'doctor':{
                    dispatch(removeDoctor(index))
                    setIsSuccessful(false)
                }
            }
        }
    };
    const handleAccept=async()=>{
        dispatch(isSending(true))
        try {
                const response = await axios({
                    method: "get",
                    url: `${Address}${url}`,
                    headers: { "enctype": "multipart/form-data", 'Access-Token':`${user.token}` },
                })
                if(response.status==200){
                switch(entity){
                    case 'doctor':{ 
                        dispatch(isSending(false))
                        dispatch(updateFeedBack({errors:[],success:['اطلاعات با موفقیت بارگذاری شد.']}))
                        setIsSuccessful(true)
                        return
                    }
                } 
                }
                
        }
        catch (e) {
            console.log(e);
               if(e.response){
                   if(e.response.status===700){
                    dispatch(updateFeedBack({errors:["دسترسی مورد نیاز فراهم نشده است."],success:[]}))
                   }}
                   else{
                    dispatch(updateFeedBack({errors:["مشکل در سرور پیش اومده"],success:[]}))
                   }
        }
        
    }
           
    
    return (
        <>
            <Grid item>
                {user.userInf.viewer && (
                    <Grid item>
                        <Button style={{ padding: 0, height: 0, width: 30 }} color='primary' onClick={handleClickOpen} >
                            <DeleteOutlinedIcon />
                        </Button>
                    </Grid>
                )}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                dir="rtl"
            >
                <DialogTitle>
                    {"آیا از حذف محتوای انتخاب شده اطمینان دارید؟"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        با قبول کردن این درخواست محتوای فوق برای همیشه از سیستم حذف خواهد شد.
                    </DialogContentText>
                    <SubmitFeedBacks/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>خیر</Button>
                    <Button onClick={handleAccept} autoFocus disabled={isSuccessful}>
                      {IsSending?<CircularProgress />: "بله"} 
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default DeleteButton;