import { closeModal } from "@/redux/action/editModelAction";
import { isChanged, isSending } from "@/redux/action/saveButtonAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import EditModelReducer from "@/redux/reducers/editModalReducer";
import { Palette } from "@mui/icons-material";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Modal, Typography } from "@mui/material";
import { palette } from "@mui/system";
import theme from "config/theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HistoryForm from "../about/history/HistoryForm";
import Form from "../form/Form";
import SaveButton from "../saveButton/SaveButton";
import SubmitFeedBacks from "../submitFeedbacks/SubmitFeedBacks";

const { Children, useState } = require("react");

const EditModal = (props) => {
    const { Open, SubmitHandler, Index } = useSelector(state => state.EditModalReducer)
    const { HistoryInf } = useSelector((state) => state.HistoryReducer)
    const {Entity}=useSelector(state=>state.EntityReducer)
    const dispatch = useDispatch();
    const handleClose = () => { dispatch(closeModal()); dispatch(updateFeedBack({ errors: [], success: [] })) }
  
    const obj=Entity.filter(e=>e.id===Index)[0];
    const [newObj,setNewObj]=useState(obj)
    const changeObj=(obj)=>{
        setNewObj(obj)
    }
    const[logInfo,setLogInfo] =useState({user:"",date:""} )

    useEffect(()=>{
        SubmitHandler==='history'?setLogInfo({ user: HistoryInf.user.family, date: new Date((HistoryInf.date)).toLocaleDateString('fa-IR') }):
        setLogInfo({user: obj.user.family, date: new Date((obj.date)).toLocaleDateString('fa-IR')});
    },[SubmitHandler])
    
    return (
        <Dialog
            open={Open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'lg'}
            sx={{ direction: 'rtl' }}
        >
            <DialogContent >
                <DialogTitle >ویرایش</DialogTitle>
                <Grid container spacing={2}>
                    <Grid sx={{ width: '100%' }} item>
                        <FormControl sx={{ width: '100%' }}>
                            <Form object={obj} changeObj={changeObj}/>
                            {SubmitHandler === 'history' && (<HistoryForm />)}
                        </FormControl>
                        <Grid container style={{flexDirection:'column',alignContent:'center'}}>
                        <Typography textAlign={"center"} color={theme.palette.success.main}>{logInfo.user}</Typography>
                        <Typography textAlign={"center"}  color={theme.palette.success.main}>({logInfo.date}) </Typography>
                        </Grid>
                    </Grid>
                    <SubmitFeedBacks/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <SaveButton newObj={newObj ? newObj : obj} />
            </DialogActions>
        </Dialog>
    )
}
export default EditModal;