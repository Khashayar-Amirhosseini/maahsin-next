import { closeModal } from "@/redux/action/editModelAction";
import EditModelReducer from "@/redux/reducers/editModalReducer";
import { Box, FormControl, Grid, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SaveButton from "../saveButton/SaveButton";
import SubmitFeedBacks from "../submitFeedbacks/SubmitFeedBacks";

const { Children, useState } = require("react");
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
const EditModal=(props)=>{
    const {Open}=useSelector(state=>state.EditModalReducer)
    const dispatch=useDispatch();
    const handleClose =()=> dispatch(closeModal())
    const {isSaved,errors,success,submitHandler}=props; 
return(
    <Modal
    open={Open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <Typography variant="h4">ویرایش</Typography>
        <Grid container spacing={2}>
            <Grid sx={{width:'100%'}} item>
                <FormControl sx={{width:'100%'}}>
                   {props.children}
                </FormControl> 
            </Grid>
            <SubmitFeedBacks success={isSaved?success:[]} errors={errors}/>
            <SaveButton submitHandler={submitHandler}/>
        </Grid>     
    </Box>
  </Modal>
)
}
export default EditModal;