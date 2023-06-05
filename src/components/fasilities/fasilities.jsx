import * as React from 'react';
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState, SyntheticEvent } from "react";
import style from './fasilities.module.css';
import AddButton from "@/components/addButton/addButton";
import DeleteButton from "@/components/deleteButton/deleteButton";
import EditButton from "@/components/editButton/EditButton";
import { openModal } from "@/redux/action/editModelAction";
import { updateEntity } from "@/redux/action/entityAction";
import { addGoals, removeGoal } from "@/redux/action/goalAction";
import { isSending } from "@/redux/action/saveButtonAction";
import { updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { addFasilities, removeFasility } from '@/redux/action/fasilityAction';
import image from './../../assets/img/image.png';
const Fasilities = () => {
    const dispatch = useDispatch();
    const { User } = useSelector(state => state.UserReducer);
    const { Fasilities } = useSelector(state => state.FasilityReducer);
    const [value, setValue] = useState(1);
    const newFasility=[{id:0,name:'تجهیز جدید',utility:'',description:'',date:new Date().valueOf(),user:{family:User.userInf.family},image:image.src,state:'active'}]
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAdd=()=>{
        const index=Fasilities.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addFasilities(newFasility));
            dispatch(updateEntity(Fasilities.concat(newFasility)))
            dispatch(openModal("fasility",newFasility[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    const handleDelete=(i)=>{
        dispatch(removeFasility(i))
        setValue(1)
    }

    return (
        <Grid container justifyContent={'center'} >
            <Grid container justifyContent={'center'} flexDirection={'column'} alignContent={'center'} >
                <h2 style={{ textAlign: 'center' }}>تجهیزات کلینیک ماه سین</h2>
                <img style={{ width: '20rem' }} src={'img/heading-cream.svg'} />
            </Grid>

            <Grid container item md={8}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {Fasilities.map((f, i) => {
                                    return (<Tab label={f.name} value={i} />)
                                }
                                )}
                            </TabList>
                        </Box>
                        {Fasilities.map((f, i) => {
                            return (
                                <TabPanel value={i}>
                                    <Grid container>
                                        <Grid item md={4} justifyContent={'center'}>
                                            <img className={style.img} src={f.image} style={{ maxWidth: '100%', margin: 'auto', display: 'block' }} />
                                        </Grid>
                                        <Grid item md={8}>
                                            <Typography variant='h4'>{f.utility}</Typography>
                                            <Typography>{f.description}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ justifyContent: 'center' }}>
                                        <EditButton user={User} onClick={e => { dispatch(openModal("fasility", f.id)); dispatch(updateEntity(Fasilities)); dispatch(updateFeedBack({ errors: [], success: [] })); dispatch(isSending(false)) }} />
                                        <AddButton user={User} onClick={e => { handleAdd() }} />
                                        <DeleteButton user={User} entity={Fasilities} index={f.id} url={`/action/admin/deleteFacility.do?facilityId=${f.id}`} onDelete={handleDelete} />
                                    </Grid>
                                </TabPanel>
                            )
                        }
                        )}
                    </TabContext>
                </Box>
            </Grid>
        </Grid>
    );

}

export default Fasilities;