import { updateDoctor } from "@/redux/action/doctorAction";
import { isChanged } from "@/redux/action/saveButtonAction";
import { PhotoCamera } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FileUpload=(props)=>{
    const {object,objectType}=props;
    const [selectedFile, setSelectedFile] = useState(object.image);
    const [image,setImage]=useState(object.image)
    const dispatch=useDispatch();
    const {doctors}=useSelector(state=>state.DoctorReducer)
    const onUploadFile=(e)=>{
        setSelectedFile(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
        const newObject={...object};
        newObject.image=URL.createObjectURL(e.target.files[0]);
        newObject.file=e.target.files[0];
        dispatch(isChanged(true));
        switch(objectType){
            case 'doctor':{
                const index=doctors.findIndex(d=>d.id==object.id)
                doctors[index]=newObject;
                dispatch(updateDoctor(doctors)) 
            }

        }
      
        //dispatch(addDoctors(updatedDoctor))*/
    }
    return(
        <Grid container sx={{flexDirection:'column',alignItems:'center'}}  >
        <img src={image} style={{width:200,height:200}}/>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input name="file" encType="multipart/form-data" hidden accept="image/*" type="file" onChange={onUploadFile} />
                    <PhotoCamera />
                </IconButton>
        </Grid>
    )
}
export default FileUpload