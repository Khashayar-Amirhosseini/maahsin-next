import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import HistoryReducer from "@/redux/reducers/historyReducer";
import axios from "axios";
import { updateHistory } from "@/redux/action/HistoryAction";
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
    const dispatch=useDispatch();
    const {history}=useSelector((state)=>state.HistoryReducer)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onChangeHandler=(e)=>{
        history.history.description=e.target.value;
        dispatch(updateHistory(history))
    }
    const onclickHandeler={
      
    }
    return ( 
        <>
        <Grid container>
            <Grid item textAlign={'justify'}>
                <Typography>{history.history.description}</Typography>
            </Grid>
            <Grid item>
                <Button variant="outlined" color='primary' onClick={handleOpen} >
                    <EditOutlinedIcon/>
                </Button>
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
                        value={history.history.description}
                        onChange={e=> onChangeHandler(e)}/>
                    </FormControl> 
                </Grid>
                <Grid item sx={{width:'100%'}} textAlign='center'>
                    <Button size="small" variant="outlined" color='primary' >
                            <SaveIcon onClick/>
                    </Button> 
                </Grid>
            </Grid>     
        </Box>
      </Modal>
        </>
     );
}
 
export default History;