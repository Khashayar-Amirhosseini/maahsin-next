import AddButton from '@/components/addButton/addButton';
import DeleteButton from '@/components/deleteButton/deleteButton';
import EditButton from '@/components/editButton/EditButton';
import { openModal } from '@/redux/action/editModelAction';
import { updateEntity } from '@/redux/action/entityAction';
import { addPolicy, removePolicy, updatePolicy } from '@/redux/action/policyAction';
import { isSending } from '@/redux/action/saveButtonAction';
import { updateFeedBack } from '@/redux/action/submitFeedBackAction';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
const Policy = (props) => {
    const {user,policyInfo}=props;
    const newPolicy=[{id:0,description:'شرح خطی مشی',date:new Date().valueOf(),user:{family:user.userInf.family},state:'active'}]
    const {Policies}=useSelector(state=>state.PolicyReducer)
    const dispatch=useDispatch()
    const handleAdd=()=>{
        const index=Policies.findIndex(d=>d.id==0);
        if(index<0){
            dispatch(addPolicy(newPolicy));
            dispatch(updateEntity(Policies.concat(newPolicy)))
            dispatch(openModal("policy",newPolicy[0].id));
            dispatch(updateFeedBack({errors:[],success:[]}));
        }
    }
    const handleDelete=(i)=>{
        dispatch(removePolicy(i))
    }

    return (
            (policyInfo.state==='active'||user.userInf.viewer)&&(
                <li style={{display:'flex'}}><ArrowLeftOutlinedIcon color="secondary"/><Typography>{policyInfo.description}</Typography>
                    <EditButton user={user}   onClick={e=>{dispatch(openModal("policy",policyInfo.id));dispatch(updateEntity(Policies));dispatch(updateFeedBack({errors:[],success:[]}));dispatch(isSending(false))}}/>
                    <AddButton user={user} onClick={e=>{handleAdd()}} />
                    <DeleteButton user={user} entity={Policies} index={policyInfo.id}  url={`/action/admin/deletePolicy.do?policyId=${policyInfo.id}`} onDelete={handleDelete}/> 
                </li>
            )
     );
}
 
export default Policy;