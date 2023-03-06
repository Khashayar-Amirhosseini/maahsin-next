import { closeModal } from "@/redux/action/editModelAction";
import { isChanged } from "@/redux/action/saveButtonAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import EditModelReducer from "@/redux/reducers/editModalReducer";
import { Palette } from "@mui/icons-material";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Modal, Typography } from "@mui/material";
import { palette } from "@mui/system";
import theme from "config/theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HistoryForm from "../about/history/HistoryForm";
import DoctorForm from "../doctor/DoctorForm";
import SaveButton from "../saveButton/SaveButton";
import SubmitFeedBacks from "../submitFeedbacks/SubmitFeedBacks";

const { Children, useState } = require("react");

const EditModal = (props) => {
    const { Open, SubmitHandler, Index } = useSelector(state => state.EditModalReducer)
    const { HistoryInf } = useSelector((state) => state.HistoryReducer)
    const {Entity}=useSelector(state=>state.EntityReducer)
    console.log(Entity);
    const dispatch = useDispatch();
    const handleClose = () => { dispatch(closeModal()); dispatch(updateFeedBack({ errors: [], success: [] })) }
  
    const obj=Entity.filter(e=>e.id===Index)[0];
    const userLog=obj.user.family;
    const [newObj,setNewObj]=useState(obj)
    const changeObj=(obj)=>{
        setNewObj(obj)
    }
    const[logInfo,setLogInfo] =useState({user:'ناشناس',date:''} )

    useEffect(()=>{
        switch (SubmitHandler) {
            case 'history':{
                setLogInfo({ user: HistoryInf.user.family, date: new Date((HistoryInf.date)).toLocaleDateString('fa-IR') })
                return 
            }
            case 'doctor': {
                setLogInfo({ user: userLog, date: new Date((obj.date)).toLocaleDateString('fa-IR') })
                return 
            }
            default:{
                setLogInfo({user:'ناشناس',date:''})
                return 
            }
        }
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
                            {SubmitHandler === 'history' && (<HistoryForm />)}
                            {SubmitHandler === 'doctor' && (<DoctorForm doctor={obj} changeDoctor={changeObj} />)}
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