import { Button, Grid,CircularProgress } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { update, updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { isChanged, isSending } from "@/redux/action/saveButtonAction";
import axios from "axios";
import { updateHistory } from "@/redux/action/HistoryAction";
import { useEffect } from "react";


const SaveButton = (props) => {
    const {SubmitHandler}=useSelector(state=>state.EditModalReducer);
    const {IsChanged,IsSending}=useSelector(state=>state.SaveButtonReducer);
    const {Address}=useSelector(state=>state.AddressReducer);
    const {HistoryInf}=useSelector(state=>state.HistoryReducer);
    const {User}=useSelector(state=>state.UserReducer);
    const dispatch=useDispatch();
    //////////history////////////////////////
    let schema=yup.object().shape({
        description:yup.string().required('فیلد تاریخچه رو نباید خالی بذاری.')
    })
    const validate=async()=>{
        try{
            switch(SubmitHandler){
                case 'history':{
                    const result= await schema.validate(HistoryInf,{abortEarly:false});
                    return result
                }
                case 'doctor':{
                    return await doctorSchema.validate(newDoctor,{abortEarly:false})
                }
            }
        }
        catch(error){
            dispatch(updateFeedBack({errors:[error.errors],success:[]})) 
        }
       
    }
    const historySubmitHandler= async(e)=>{
       dispatch(updateFeedBack({errors:[],success:[]}))
        e.preventDefault();
        const result=await validate();
        if(result&&IsChanged){
        dispatch(isSending(true))  
            try{
                const response=await axios({
                method: "get",
                url: `${Address}/action/history/historySave.do?description=${HistoryInf.description}&userId=${User.userInf.id}`,
                headers:{'Access-Token':`${User.token}`}
                }) 
                dispatch(isChanged(false))
                dispatch(updateFeedBack({errors:[],success:['اطلاعات با موفقیت بارگذاری شد.']}))
            }
            catch(e){
                if(e.response){
                if(e.response.status===700){
                    dispatch(updateFeedBack({errors:["دسترسی مورد نیاز فراهم نشده است."],success:[]}))
                }}
                else{
                    dispatch(updateFeedBack({errors:["مشکل در سرور پیش اومده"],success:[]}))
                }             
            }
            dispatch(isSending(false)) 
        } 
    } 


    ////////////////doctor//////
    const {doctors}=useSelector(state=>state.DoctorReducer);
    const{newDoctor}=props;
    let doctorSchema = yup.object().shape({
        name: yup.string().required('فیلد نام دکتر رو نباید خالی بذاری.'),
        family: yup.string().required('فیلد نام خانوادگی دکتر رو نباید خالی بذاری.'),
        medicalId: yup.string().required('فیلد شماره پروانه پزشکی دکتر رو نباید خالی بذاری.'),
        about: yup.string().required('در مورد دکتر یکم بنویس باهم اشنا شیم.'),
    })
    /////////////////////////////
    const saveButtonSubmitHandeler=async(e)=>{  
        
        switch (SubmitHandler){
            case('history'):{
               return historySubmitHandler(e)
            }
            case('doctor'):{
                const index=doctors.findIndex(d=>d.id==newDoctor.id)
                doctors[index].name=newDoctor.name;
                doctors[index].family=newDoctor.family;
                doctors[index].medicalId=newDoctor.medicalId;
                doctors[index].about=newDoctor.about;
                dispatch(updateHistory(doctors))
                const updateUrl='/action/doctor/updateDoctor.do'
                const saveUrl='/action/doctor/saveDoctor.do'
              return submitHandler(e,doctors[index],updateUrl,saveUrl)
            }
        }
    }
    const submitHandler = async (e,object,updateUrl,saveUrl) => {
        dispatch(updateFeedBack({errors:[],success:[]}))
        const result = await validate();
        const formData = new FormData;
        if (result&&IsChanged) {
            dispatch(isSending(true))
            for (const i in object){
            formData.append(i, result[i]);
            }
            !formData.get('file')&&(formData.append('file',new File([""], "filename")))
            formData.delete('date');
            formData.delete('user')
            //formData.append("file", (object.file===undefined)?new File([""], "filename"):selectedFile);
            formData.append("userId", User.userInf.id)
            if (result.id !== 0) {
                formData.append("id", result.id);
                try {
                    const response = await axios({
                        method: "post",
                        url: `${Address}${updateUrl}`,
                        data: formData,
                        headers: { "enctype": "multipart/form-data",'Access-Token':`${User.token}`},
                    })
                    dispatch(isSending(false))
                    dispatch(isChanged(false))
                }
                catch (e) {
                    if(e.response){
                        if(e.response.status===700){
                            dispatch(updateFeedBack({errors:["دسترسی مورد نیاز فراهم نشده است."],success:[]}))
                        }}
                        else{
                            dispatch(updateFeedBack({errors:["مشکل در سرور پیش اومده"],success:[]})) 
                    }
                    dispatch(isSending(false))
                }
            }
            else {
                try {
                    const response = await axios({
                        method: "post",
                        url: `${Address}${saveUrl}`,
                        data: formData,
                        headers: { "enctype": "multipart/form-data",'Access-Token':`${User.token}` },
                    })
                    dispatch(isSending(false))
                    dispatch(isChanged(false))
                }
                catch (e) {
                    if(e.response){
                        if(e.response.status===700){
                            dispatch(updateFeedBack({errors:["دسترسی مورد نیاز فراهم نشده است."],success:[]}))
                        }}
                        else{
                            dispatch(updateFeedBack({errors:["مشکل در سرور پیش اومده"],success:[]}))
                    }
                    dispatch(isSending(false)) 
                }
            }

        }
       
    }
    return (
        <Grid item sx={{ width: '100%' }} textAlign='center'>
            <Button size="small" variant="outlined" color={IsChanged ? 'error' : 'primary'} onClick={saveButtonSubmitHandeler} disabled={IsSending}>
                {IsSending ? <CircularProgress /> : <SaveIcon />}
            </Button>
        </Grid>
    );
}

export default SaveButton;