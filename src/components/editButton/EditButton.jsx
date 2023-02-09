import { Button, Grid } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EditButton = (props) => {
    const {user,onClick}=props
    return ( 
        <Grid container item>
            {user.isAuthenticated&&(<Grid item>
                <Button variant="outlined" color='primary' onClick={onClick} >
                    <EditOutlinedIcon/>
                </Button>
            </Grid>)}
        </Grid>
     );
}
 
export default EditButton;