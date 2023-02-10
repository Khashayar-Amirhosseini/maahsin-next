import { Grid, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import theme from "config/theme";
import { useSelector } from "react-redux";

const SubmitFeedBacks = (props) => {
    const {Errors} = useSelector(state=>state.SubmitFeedBackReducer);
    const {Success} = useSelector(state=>state.SubmitFeedBackReducer);
    return (
        <Grid item sx={{ width: '100%' }}>
            {Errors.length !== 0 && (
                <ul style={{ color: 'error' }}  >
                    {Errors.map((er) => {
                        return (
                            <li style={{ textAlign: 'justify',color: 'red'  }} key={uuidv4()} >
                                <Typography  key={uuidv4()} className="Errors" >{er}</Typography>
                            </li>
                        )
                    })}
                </ul>)}
            {Success && (
                <ul style={{padding:0,textAlign:'center'}}>
                    {Success.map((s) => {
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