import { Button, Grid,CircularProgress } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { update, updateFeedBack } from "@/redux/action/submitFeedBackAction";
import { isChanged, isSending } from "@/redux/action/saveButtonAction";
import axios from "axios";
import { updateHistory } from "@/redux/action/HistoryAction";
import { useEffect } from "react";
import { addDoctors, removeDoctor, updateDoctor } from "@/redux/action/doctorAction";
import { addPolicy, removePolicy, updatePolicy } from "@/redux/action/policyAction";
import { openModal } from "@/redux/action/editModelAction";
import { updatGoals } from "@/redux/action/goalAction";
import { removeAcheivement, updatAcheivements } from "@/redux/action/achievementAction";
import { removePicture } from "@/redux/action/pictureAction";


const SaveButton = (props) => {
    const {SubmitHandler}=useSelector(state=>state.EditModalReducer);
    const {IsChanged,IsSending}=useSelector(state=>state.SaveButtonReducer);
    const {Address}=useSelector(state=>state.AddressReducer);
    const {HistoryInf}=useSelector(state=>state.HistoryReducer);
    const {User}=useSelector(state=>state.UserReducer);
    const{newObj}=props;
    const dispatch=useDispatch();
    const validate=async()=>{
        try{
            switch(SubmitHandler){
                case 'history':{
                    const result= await schema.validate(HistoryInf,{abortEarly:false});
                    return result
                }
                case 'doctor':{
                    return await doctorSchema.validate(newObj,{abortEarly:false})
                }
                case 'goal':{
                    return await goalSchema.validate(newObj,{abortEarly:false})
                }
                case 'policy':{
                    return await policySchema.validate(newObj,{abortEarly:false})
                }
                case 'acheivement':{
                    return await acheivmentSchema.validate(newObj,{abortEarly:false})
                }  
            }
        }
        catch(error){
            dispatch(updateFeedBack({errors:error.errors,success:[]})) 
        }
       
    }
    //////////history////////////////////////
    let schema=yup.object().shape({
        description:yup.string().required('فیلد تاریخچه رو نباید خالی بذاری.')
    })
    
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
    let doctorSchema = yup.object().shape({
        name: yup.string().required('فیلد نام دکتر رو نباید خالی بذاری.'),
        family: yup.string().required('فیلد نام خانوادگی دکتر رو نباید خالی بذاری.'),
        medicalId: yup.string().required('فیلد شماره پروانه پزشکی دکتر رو نباید خالی بذاری.'),
        about: yup.string().required('در مورد دکتر یکم بنویس باهم اشنا شیم.'),
    })
    /////////goal/////////////
    const {Goals}=useSelector(state=>state.GoalReducer);
    let goalSchema = yup.object().shape({
        description: yup.string().required('فیلد نام هدف را نباید خالی بزاری.'),
    })

    /////policy///////
    const {Policies}=useSelector(state=>state.PolicyReducer);
    let policySchema = yup.object().shape({
        description: yup.string().required('فیلد شرح خطی مشی را نباید خالی بزاری.'),
    })

    /////acheivement///////
    const {Acheivements}=useSelector(state=>state.AcheivementReducer);
    let acheivmentSchema = yup.object().shape({
        description: yup.string().required('فیلد شرح خطی مشی را نباید خالی بزاری.'),
    })
    /////picture/////
    const {Pictures}=useSelector(state=>state.PictureReducer)
    /////////////////////////////
    const saveButtonSubmitHandeler=async(e)=>{  
        switch (SubmitHandler){
            case('history'):{
               return historySubmitHandler(e)
            }
            case('doctor'):{
                const newDoctor=newObj
                const index=doctors.findIndex(d=>d.id==newDoctor.id)
                doctors[index].name=newDoctor.name;
                doctors[index].family=newDoctor.family;
                doctors[index].medicalId=newDoctor.medicalId;
                doctors[index].about=newDoctor.about;
                dispatch(updateDoctor(doctors))
                const updateUrl='/action/doctor/updateDoctor.do'
                const saveUrl='/action/doctor/saveDoctor.do'
                const response= await submitHandler(e,doctors[index],updateUrl,saveUrl)
                if(doctors[index].id===0&& response){
                doctors[index].id=response.id;
                dispatch(removeDoctor(0));
                //dispatch(addDoctors([doctors[index]));
                dispatch(dispatch(openModal("doctor",doctors[index].id)));
                }
                return
            }
            case ('goal'):{
                const newGoal=newObj;
                const index=Goals.findIndex(d=>d.id==newGoal.id)
                Goals[index].description=newGoal.description;
                dispatch(updatGoals(Goals[index]))
                const updateUrl='/action/goal/updateGoal.do'
                const saveUrl='/action/goal/saveGoal.do'
                const response= await submitHandler(e,Goals[index],updateUrl,saveUrl)
                if(Goals[index].id===0&& response){
                Goals[index].id=response.id;
                dispatch(removeDoctor(0));
                //dispatch(addDoctors([doctors[index]));
                dispatch(dispatch(openModal("goal",Goals[index].id)))
                } 
                return
            }
            case 'policy':{
                const newPolicy=newObj;
                const index=Policies.findIndex(d=>d.id==newPolicy.id)
                Policies[index].description=newPolicy.description;
                dispatch(updatePolicy(Policies[index]))
                const updateUrl='/action/policy/updatePolicy.do?'
                const saveUrl='/action/policy/savePolicy.do?'
                const response= await submitHandler(e,Policies[index],updateUrl,saveUrl)
                if(Policies[index].id===0&& response){
                Policies[index].id=response.id;
                dispatch(removePolicy(0));
                //dispatch(addDoctors([doctors[index]));
                dispatch(dispatch(openModal("policy",Policies[index].id)))
                }
                return 
            }
            case 'acheivement':{
                const newAcheivement=newObj;
                const index=Acheivements.findIndex(d=>d.id==newAcheivement.id)
                Acheivements[index].description=newAcheivement.description;
                dispatch(updatAcheivements(Acheivements[index]))
                const updateUrl='/action/achievement/achievementUpdate.do?'
                const saveUrl='/action/achievement/achievementSave.do?'
                const response= await submitHandler(e,Policies[index],updateUrl,saveUrl)
                if(Acheivements[index].id===0&& response){
                Acheivements[index].id=response.id;
                dispatch(removeAcheivement(0));
                //dispatch(addDoctors([doctors[index]));
                dispatch(dispatch(openModal("acheivement",Acheivements[index].id)))
                }
                return
            }
            case 'picture':{
                const newPicture=newObj;
                const index=Pictures.findIndex(d=>d.id===newPicture.id)
                const updateUrl=''
                const saveUrl='/action/picture/savePicture.do'
                const response= await submitHandler(e,Pictures[index],updateUrl,saveUrl)
                if(Pictures[index].id===0&& response){
                Pictures[index].id=response.id;
                dispatch(removePicture(0));
                //dispatch(addDoctors([doctors[index]));
                dispatch(dispatch(openModal("picture",Pictures[index].id)))}
                return
            }
        }
    }
    const submitHandler = async (e,object,updateUrl,saveUrl) => {
        dispatch(updateFeedBack({errors:[],success:[]}))
        const result = await validate(object);
        const formData = new FormData;
        if (result&&IsChanged) {
            console.log(object);
            dispatch(isSending(true))
            for (const i in object){
            formData.append(i, result[i]);
            }
            !formData.get('file')&&(formData.append('file',new File([""],"filename")))
            formData.delete('date');
            formData.delete('user');
            formData.delete('image')
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
                    dispatch(updateFeedBack({errors:[],success:['اطلاعات با موفقیت بارگذاری شد.']}))
                    return response.date;
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
                    dispatch(updateFeedBack({errors:[],success:['اطلاعات با موفقیت بارگذاری شد.']}))
                    return response.data;
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