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
    const { doctors } = useSelector(state => state.DoctorReducer);
    const dispatch = useDispatch();
    const handleClose = () => { dispatch(closeModal()); dispatch(updateFeedBack({ errors: [], success: [] })) }
    ////doctor/////
    const doc = doctors.filter(d => d.id == Index)[0];
    const [newDoctor, setNewDoctor] = useState(doc)
    const changeDoctor = (doctor) => {
        setNewDoctor(doctor)
    }
    const[logInfo,setLogInfo] =useState({user:'ناشناس',date:''} )

    useEffect(()=>{
        switch (SubmitHandler) {
            case 'history':{
                setLogInfo({ user: HistoryInf.user.family, date: new Date((HistoryInf.date)).toLocaleDateString('fa-IR') })
                return 
            }
            case 'doctor': {
                setLogInfo({ user: doc.user.family, date: new Date((doc.date)).toLocaleDateString('fa-IR') })
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
            fullWidth
            maxWidth
            sx={{ direction: 'rtl' }}
        >
            <DialogContent >
                <DialogTitle >ویرایش</DialogTitle>
                <Grid container spacing={2}>
                    <Grid sx={{ width: '100%' }} item>
                        <FormControl sx={{ width: '100%' }}>
                            {SubmitHandler === 'history' && (<HistoryForm />)}
                            {SubmitHandler === 'doctor' && (<DoctorForm doctor={doc} changeDoctor={changeDoctor} />)}
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
                <SaveButton newDoctor={newDoctor ? newDoctor : doc} />
            </DialogActions>
        </Dialog>
    )
}
export default EditModal;