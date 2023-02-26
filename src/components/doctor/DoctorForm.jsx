import { addDoctors, removeDoctor, updateDoctor } from "@/redux/action/doctorAction";
import { isChanged } from "@/redux/action/saveButtonAction";
import { PhotoCamera } from "@mui/icons-material";
import { Grid, IconButton, Switch, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../fileUpload/FileUpload";

const DoctorForm = props => {
    const { changeDoctor, doctor } = props;
    const [newDoctor, setNewDoctor] = useState(doctor);
    const dispatch = useDispatch();
    const checked = (doctor.state === 'active') ? true : false;
    const onChangeHandler = (e) => {
        e.preventDefault
        dispatch(isChanged(true))
        const updatedDoctor = newDoctor;
        if (e.target.name === 'state') {
            updatedDoctor['state'] = (updatedDoctor.state === 'active') ? 'disactive' : 'active'

        }
        else {

            updatedDoctor[e.target.name] = e.target.value;
        }
        setNewDoctor(updatedDoctor)
        changeDoctor(newDoctor)
        /*const index=doctors.findIndex(d=>d.id==Index)
        doctors[index]=updatedDoctor;
        dispatch(updateDoctor(updateDoctor))
        //dispatch(addDoctors(updatedDoctor))*/
    }




    return (
        <Grid container >
            <Grid container item md={8} sx={{ justifyContent: 'space-between' }}>
                <TextField required
                    id="standard-basic"
                    label="نام"
                    variant="outlined"
                    onChange={e => onChangeHandler(e)}
                    defaultValue={newDoctor.name}
                    name='name'
                    margin="normal"
                />
                <TextField required
                    id="standard-basic"
                    label="نام خانوادگی"
                    variant="outlined"
                    margin="normal"
                    defaultValue={newDoctor.family}
                    onChange={e => onChangeHandler(e)}
                    name='family'
                />
                <TextField required
                    id="standard-basic"
                    label="شماره پروانه"
                    variant="outlined"
                    margin="normal"
                    defaultValue={newDoctor.medicalId}
                    name='medicalId'
                    onChange={e => onChangeHandler(e)}
                />
                <TextField required
                    id="standard-basic"
                    label="درباره"
                    multiline
                    variant="outlined"
                    rows={4}
                    margin="normal"
                    fullWidth
                    defaultValue={newDoctor.about}
                    onChange={e => onChangeHandler(e)}
                    name='about'
                />
                <Switch defaultChecked={checked} name="state" onChange={onChangeHandler} />
            </Grid>
            <Grid container item md={4} style={{padding:'10px'}}>
            {<FileUpload object={newDoctor} objectType='doctor' />}
            </Grid>
        </Grid>
    );
}

export default DoctorForm;