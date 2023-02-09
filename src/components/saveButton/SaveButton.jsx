import { Button, Grid,CircularProgress } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from "react-redux";

const SaveButton = (props) => {
    const {submitHandler}=props;
    const {isSending,isChanged}=useSelector(state=>state.SaveButtonReducer);
    return (
        <Grid item sx={{ width: '100%' }} textAlign='center'>
            <Button size="small" variant="outlined" color={isChanged ? 'error' : 'primary'} onClick={submitHandler} disabled={isSending}>
                {isSending ? <CircularProgress /> : <SaveIcon />}
            </Button>
        </Grid>
    );
}

export default SaveButton;