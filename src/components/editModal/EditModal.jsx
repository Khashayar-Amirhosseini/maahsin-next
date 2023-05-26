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
import { updateSubService } from "@/redux/action/clusterAction";

const { Children, useState } = require("react");

const EditModal = (props) => {
    const { Open, SubmitHandler, Index } = useSelector(state => state.EditModalReducer)
    const {Entity}=useSelector(state=>state.EntityReducer);
    const dispatch = useDispatch();
    const handleClose = () => {
         dispatch(closeModal()); 
         dispatch(updateFeedBack({ errors: [], success: [] }));
        }
    const obj=Entity.filter(e=>e.id===Index)[0];

    const [newObj,setNewObj]=useState(obj);
    const changeObj=(obj)=>{
        setNewObj(obj)
    }
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
                        </FormControl>
                        <Grid container style={{flexDirection:'column',alignContent:'center'}}>
                        <Typography textAlign={"center"} color={theme.palette.success.main}>{obj.user.family}</Typography>
                        <Typography textAlign={"center"}  color={theme.palette.success.main}> ({(new Date(obj.date)).toLocaleDateString('fa-IR')}) </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid container spacing={2} width={'100%'}>
                        <SubmitFeedBacks/>
                    </Grid>
                    <Grid container spacing={2} width={'100%'}>
                        <SaveButton newObj={newObj ? newObj : obj} />
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}
export default EditModal;