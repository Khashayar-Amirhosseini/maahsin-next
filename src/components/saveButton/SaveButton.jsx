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
import { addGoals, removeGoal, updatGoals } from "@/redux/action/goalAction";
import { removeAcheivement, updatAcheivements } from "@/redux/action/achievementAction";
import { removePicture } from "@/redux/action/pictureAction";
import { addClusters, removeCluster, updateCluster, updateSubService } from "@/redux/action/clusterAction";
import { addServices, removeService, updateService } from "@/redux/action/serviceAction";
import { resolve } from "styled-jsx/css";
import { updateEntity } from "@/redux/action/entityAction";
import {useStore } from 'react-redux'
import { removeFasility, updateFasility } from "@/redux/action/fasilityAction";




const SaveButton = (props) => {
    const {SubmitHandler}=useSelector(state=>state.EditModalReducer);
    const {IsChanged,IsSending}=useSelector(state=>state.SaveButtonReducer);
    const {Address}=useSelector(state=>state.AddressReducer);
    const {User}=useSelector(state=>state.UserReducer);
    const store=useStore()
    const{newObj}=props;
    const dispatch=useDispatch();
    const validate=async(object)=>{
        try{
            switch(SubmitHandler){
                case 'history':{
                    const result= await schema.validate(newObj,{abortEarly:false});
                    return result
                }
                case 'doctor':{
                    return await doctorSchema.validate(newObj,{abortEarly:false})
                }
                case 'goal':{
                    return await goalSchema.validate(object,{abortEarly:false})
                }
                case 'policy':{
                    return await policySchema.validate(object,{abortEarly:false})
                }
                case 'acheivement':{
                    return await acheivmentSchema.validate(object,{abortEarly:false})
                } 
                case 'cluster':{
                    return await clusterSchema.validate(object,{abortEarly:false})
                } 
                case 'service':{
                    return await serviceSchema.validate(object,{abortEarly:false})
                }
                case 'fasility':{
                    return await fasilitySchema.validate(object,{abortEarly:false})
                }
                default:{
                    return newObj
                } 
            }
        }
        catch(error){
            dispatch(updateFeedBack({errors:error.errors,success:[]})) 
        }
       
    }
    //////////history////////////////////////
    const {HistoryInf}=useSelector(state=>state.HistoryReducer);
    let schema=yup.object().shape({
        description:yup.string().required('فیلد تاریخچه رو نباید خالی بذاری.')
    })
    
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
    /////cluseter////
    const {Clusters}=useSelector(state=>state.ClusterReducer);
    let clusterSchema = yup.object().shape({
        title: yup.string().required('فیلد عنوان خدمت اصلی را نباید خالی بزاری.'),
    })
    ///////service////
    const {Services}=useSelector(state=>state.ServiceReducer);
    let serviceSchema = yup.object().shape({
        title: yup.string().required('فیلد عنوان خدمت اصلی را نباید خالی بزاری.'),
        description: yup.string().required('راجب خدمت باید یکم توضیحات بنویسی')
    })
    //////fasility/////
    const {Fasilities}=useSelector(state=>state.FasilityReducer);
    let fasilitySchema = yup.object().shape({
        name: yup.string().required('فیلد نام تجهیز را نباید خالی بزاری.'),
        utility: yup.string().required('قابلیت کلیدی تجهیز را بنویس'),
        description:yup.string().required('راجب تجهیزباید یکم توضیحات بنویسی'),
    })
    /////////////////////////////
    const saveButtonSubmitHandeler=async(e)=>{ 
        switch (SubmitHandler){
            case('history'):{
               dispatch(updateHistory(newObj));
               const updateUrl='/action/history/historySave.do?';
               const response= await submitHandler(e,newObj,updateUrl,'');
               if(response){
                    newObj.user=response.user;
                    newObj.date=response.date;
                    dispatch(updateHistory(newObj))
               }
               return
            }
            case('doctor'):{
                dispatch(updateDoctor(newObj))
                const updateUrl='/action/doctor/updateDoctor.do'
                const saveUrl='/action/doctor/saveDoctor.do'
                const response= await submitHandler(e,newObj,updateUrl,saveUrl)
                if(newObj.id===0&& response){
                newObj.id=response.id;
                newObj.user=response.user;
                newObj.date=response.date;
                dispatch(removeDoctor(0));
                dispatch(dispatch(openModal("doctor",response.id)));
                }
                return
            }
            case ('goal'):{
                dispatch(updatGoals(newObj)) 
                const updateUrl='/action/goal/updateGoal.do'
                const saveUrl='/action/goal/saveGoal.do'
                const response= await submitHandler(e,newObj,updateUrl,saveUrl)
                if(newObj.id===0&& response){
                newObj.id=response.id;
                newObj.user=response.user;
                newObj.date=response.date;
                dispatch(removeGoal(0));
                dispatch(dispatch(openModal("goal",response.id)))
                } 
                return
            }
            case 'policy':{
                dispatch(updatePolicy(newObj))
                const updateUrl='/action/policy/updatePolicy.do?'
                const saveUrl='/action/policy/savePolicy.do?'
                const response= await submitHandler(e,newObj,updateUrl,saveUrl)
                if(newObj.id===0&& response){
                    newObj.id=response.id;
                    newObj.user=response.user;
                    newObj.date=response.date;
                dispatch(removePolicy(0));
                dispatch(dispatch(openModal("policy",newObj.id)))
                }
                return 
            }
            case 'acheivement':{
                dispatch(updatAcheivements(newObj))
                const updateUrl='/action/achievement/achievementUpdate.do?'
                const saveUrl='/action/achievement/achievementSave.do?'
                const response= await submitHandler(e,newObj,updateUrl,saveUrl)
                if(newObj.id===0&& response){
                    newObj.id=response.id;
                    newObj.user=response.user;
                    newObj.date=response.date;
                dispatch(removeAcheivement(0));
                dispatch(dispatch(openModal("acheivement",newObj.id)))
                }
                return
            }
            case 'picture':{
                const updateUrl=''
                const saveUrl='/action/picture/savePicture.do'
                const response= await submitHandler(e,newObj,updateUrl,saveUrl)
                if(newObj.id===0&& response){
                    newObj.id=response.id;
                    newObj.user=response.user;
                    newObj.date=response.date;
                dispatch(removePicture(0));
                dispatch(dispatch(openModal("picture",newObj.id)))}
                return
            }
            case 'cluster':{
                const newCluster=newObj;
                const updateUrl='/action/service/updateMainService.do?'
                const saveUrl='/action/service/saveMainService.do?'
                const saveServiceUrl='/action/service/saveService.do?'
                const promis=new Promise(async(resolve,reject)=>{
                    const response1= await submitHandler(e,newCluster,updateUrl,saveUrl);
                    if(response1&&response1.id){
                        resolve(response1)
                    }
                    else{
                        reject(console.log('reject shod'))
                    }
                }
                )

                promis.then(
                    async(r)=>{ 
                    if(newCluster.id===0){
                        const newService={id:0,title:"خدمت جدید",description:"",user:{name:"",family:""},date:new Date,image:"",mainServiceId: parseInt(r.id)}
                        const response2= await submitHandler(e,newService,'',saveServiceUrl);
                        dispatch(removeCluster(0));
                        response2.image= `${Address}/resources/images/${response2.id}.png`
                        dispatch(addServices([response2]))
                        r.services=[response2];
                        r.image= `${Address}/resources/images/${r.id}.png`
                        dispatch(addClusters([r]));
                        let newClusters=store.getState().ClusterReducer.Clusters
                        dispatch(updateEntity(newClusters));
                        dispatch(dispatch(openModal("cluster",r.id)))
                    }
                    }
                )
                return
            }
            case 'service':{
                dispatch(updateService(newObj));
                const updateUrl='/action/service/updateService.do?'
                const saveUrl='/action/service/saveService.do?'
                const response= await submitHandler(e,newObj,updateUrl,saveUrl)
                if(newObj.id===0&& response){
                    newObj.id=response.id;
                    newObj.user=response.user;
                    newObj.date=response.date;
                    dispatch(removeService(0));
                    const Cluster=Clusters.filter(c=>c.id===newObj.mainServiceId)[0];
                    const newCluster2={...Cluster,services:Cluster.services.filter(s=>s.id!==0)}
                    dispatch(updateCluster(newCluster2))
                    dispatch(dispatch(openModal("service",newObj.id)))
                }
                return
            }
            case 'fasility':{
                dispatch(updateFasility(newObj));
                const updateUrl='/action/facility/updateFacility.do?'
                const saveUrl='/action/facility/saveFacility.do?'
                const response= await submitHandler(e,newObj,updateUrl,saveUrl)
                if(newObj.id===0&& response){
                    newObj.id=response.id;
                    newObj.user=response.user;
                    newObj.date=response.date;
                    dispatch(removeFasility(0));
                    dispatch(dispatch(openModal("fasility",response.id)))
                }
                return
            }
        }
    }
    const submitHandler = async (e,object,updateUrl,saveUrl) => {
        dispatch(updateFeedBack({errors:[],success:[]}))
        const result = await validate(object);
        const formData = new FormData();
        if (result&&IsChanged) {
            dispatch(isSending(true))
            for (const i in object){
            formData.append(i, result[i]);
            }
            !formData.get('file')&&(formData.append('file',new File([""],"filename")))
            formData.delete('date');
            formData.delete('user');
            formData.delete('image');
            formData.delete('services');
            formData.delete('lastUpdateDate');
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

