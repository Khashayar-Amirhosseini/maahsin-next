import { isChanged } from "@/redux/action/saveButtonAction";
import { PhotoCamera } from "@mui/icons-material";
import { Grid, IconButton, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const Form = (props) => {
    const {object,changeObj}=props;
    const [newObject, setNewObject] = useState(object);
    const [selectedFile, setSelectedFile] = useState(object.image);
    const [image,setImage]=useState(object.image)
    const dispatch = useDispatch();
    const checked = (object.state === 'active') ? true : false;
    const properties=['name','family','medicalId','about','description']
    const onChangeHandler = (e) => {
        e.preventDefault
        dispatch(isChanged(true))
        const updatedObject = newObject;
        if (e.target.name === 'state') {
            updatedObject['state'] = (updatedObject.state === 'active') ? 'disactive' : 'active'
        }
        if(e.target.name==='file'){
            console.log(e);
            setSelectedFile(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
            console.log(image);
            updatedObject.image=URL.createObjectURL(e.target.files[0]);
            updatedObject.file=e.target.files[0];
        }
        else {
           
            updatedObject[e.target.name] = e.target.value;
        }
        setNewObject(updatedObject)
        changeObj(newObject)
    }
    const PersianLabales=new Map();
    PersianLabales.set('name','نام');
    PersianLabales.set('family','نام خانوادگی');
    PersianLabales.set('medicalId','شماره نظام پزشکی');
    PersianLabales.set('about','درباره');
    PersianLabales.set('description','شرح');
    return (
        <Grid container >
            <Grid container item md={8} sx={{ justifyContent: 'space-between' }}>
                {properties.map(p=>{
                    return(
                        (object[p]||object[p]==='')&&(<TextField key={uuidv4()} required
                            id="standard-basic"
                            label={PersianLabales.get(p)}
                            variant="outlined"
                            defaultValue={newObject[p]}
                            name={p}
                            margin="normal"
                            onChange={onChangeHandler}
                            multiline={p.indexOf("about")>-1}
                            rows={p.indexOf("about")>-1?4:1}
                            fullWidth={p.indexOf("about")>-1}

                    />
                    ))
                })}
                <Switch defaultChecked={checked} name="state" onChange={onChangeHandler} />
            </Grid>

            {Object.hasOwn(object, "image")&&(
            <Grid container item md={4} style={{padding:'10px'}}>
                <Grid container sx={{flexDirection:'column',alignItems:'center'}}  >
                <img src={image} style={{width:200,height:200}}/>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input name="file" encType="multipart/form-data" hidden accept="image/*" type="file" onChange={onChangeHandler} />
                    <PhotoCamera/>
                </IconButton>
        </Grid>
            </Grid>)}
        </Grid>
     );
}
 
export default Form;