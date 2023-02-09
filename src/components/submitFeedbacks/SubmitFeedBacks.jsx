import { Grid, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import theme from "config/theme";

const SubmitFeedBacks = (props) => {
    const errors = props.errors;
    const success = props.success;
    return (
        <Grid item sx={{ width: '100%' }}>
            {errors.length !== 0 && (
                <ul style={{ color: 'error' }}  >
                    {errors.map((er) => {
                        return (
                            <li style={{ textAlign: 'justify' }} key={uuidv4()} >
                                <Typography style={{ color: 'red' }} key={uuidv4()} className="Errors" >{er}</Typography>
                            </li>
                        )
                    })}
                </ul>)}
            {success && (
                <ul style={{padding:0,textAlign:'center'}}>
                    {success.map((s) => {
                        return (
                            <li style={{listStyle:'none'}}>
                                <Typography style={{ textAlign: 'justify', color: theme.palette.success.main }} variant="span" >{s}</Typography>
                            </li> 
                        )
                    }   
                    )}
                </ul>)}                   
        </Grid>
    );
}

export default SubmitFeedBacks;