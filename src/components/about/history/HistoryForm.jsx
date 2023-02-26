import { updateHistory } from "@/redux/action/HistoryAction";
import { isChanged } from "@/redux/action/saveButtonAction";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const HistoryForm=()=>{
    const dispatch=useDispatch();
    const {HistoryInf}=useSelector((state)=>state.HistoryReducer)
    const onChangeHandler=async(e)=>{
        dispatch(updateHistory({...HistoryInf,description:e.target.value}));
        dispatch(isChanged(true))
    }
    return(
    <Grid Container >
    <TextField required 
        fullWidth
        id="standard-basic" 
        label="تاریخچه" 
        multiline 
        variant="standard"
        rows={4}
        defaultValue={HistoryInf.description}
        onChange={e=> onChangeHandler(e)}
    />
    </Grid>)
}
export default HistoryForm;