import { padding } from "@mui/system";
import { useState } from "react";
import style from './signInModal.module.css';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import * as yup from 'yup';
import axios from "axios";
import { useSelector } from "react-redux";
import AddressReducer from "@/redux/reducers/addressReducer";



const { Modal,Box, Typography,Grid, FormControl, TextField, Button } = require("@mui/material");


const SignInModal = (props) => {
    const {Address}=useSelector(state=>state.AddressReducer);
    console.log("address",Address)
    const [account, setAccount] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([])
    const [isSending, setIsSending] = useState(false)
    const [isLoginSuccessful,setIsLoginSuccessFul]=useState(false);
    const handleChange = (e) => {
        const input = e.currentTarget;
        let newAccount = { ...account }
        newAccount[input.name] = input.value;
        setAccount(newAccount)
    }
    
    let schema = yup.object().shape({
        email: yup.string().email('فرمت ایمیل صحیح نیست').required('فیلد ایمیل الزامی است.'),
        password: yup.string().min(6, 'پسورد حداقل 6 کاراکتر است.')
    })
    const validate = async () => {
        try {
            const result = await schema.validate(account, { abortEarly: false });
            return result
        }
        catch (error) {
            setErrors(error.errors)
        }

    }
    const submitHandler = async (e) => {
        setErrors([])
        setIsLoginSuccessFul(false)
        e.preventDefault();
        const result = await validate();
        const formData = new FormData;
        if (result) {
            setIsSending(true)
            formData.append("userName", result.email);
            formData.append("password", result.password);
            try {
                const response = await axios({
                    method: "post",
                    url: `${Address}/action/login.do`,
                    data: formData,
                })
        
                if(response.data.token){
                    setIsLoginSuccessFul(true);
                    props.login(response.data);
                    localStorage.setItem("user",JSON.stringify(response.data)) ; 
                }
                else{
                    setErrors(["رمز عبور یا ایمیل وارد شده صحیح نیست."])
                }
            }
            catch (e) {
                setErrors(["مشکل در سرور پیش اومده"])
            }
            setIsSending(false)
        }

    }
return(
    <Modal
    open={props.open}
    onClose={props.close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box className={style.modal}>
        <Typography variant="h4" sx={{padding:2,borderBottom:'1px solid #ccc'}}>ورود</Typography>
        <Grid container spacing={2} textAlign='center'>
            <Grid sx={{width:'100%'} } item>
                <FormControl sx={{width:'80%',padding:'5px',borderBottom:'1px solid #ccc'}} >
                    <TextField required 
                    id="standard-basic" 
                    label="نام کاربری" 
                    variant="outlined"
                    sx={{margin:"5px"}}
                    value={account.userName}/>
                    <TextField required 
                    id="standard-basic" 
                    label="رمز ورود"
                    variant="outlined"
                    type='password'
                    sx={{margin:'5px'}}
                    value={account.password}/>
                </FormControl> 
            </Grid>
            
                <Button size="small" sx={{marginTop:'5px !important',marginBottom:'5px !important',margin:'auto'}} variant="outlined" color='primary' >  
                    <VpnKeyOutlinedIcon/>
                </Button> 
            
        </Grid>     
    </Box>
  </Modal>
)
}

export default SignInModal;