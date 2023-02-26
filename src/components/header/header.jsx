
import style from './header.module.css';
import axios from 'axios';
import HeaderLoading from './headerLoading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, NavLink } from 'next';
import useSWRInfinite from 'swr'
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
//import UserProfile from '../../containers/userProfile/userProfile';
//import { calculateNewValue } from '@testing-library/user-event/dist/utils';
const Header = (props) => {
    const {Address}=useSelector(state=>state.AddressReducer);
    const {User}=useSelector(state=>state.UserReducer)
    const url=`${Address}/action/guest/findAllFooters.do?`;
    const{data,error,isLoading}=useSWRInfinite(url,axios);
    const logoutHandler=()=>{
        props.logout();
    } 
    return (
        <div className={style.main}>
            {User.isAuthenticated?
            <Grid container>
                <Grid item className={style.userProfile} sx={{width:'50%'}}>
                    <p color='secondary' style={{float:"right",width:"auto"}}> <AccountCircleOutlinedIcon color='secondary' className={style.icone}/> سلام {User.userInf.name} عزیز </p>
                </Grid>
                <Grid item className={style.userProfile} sx={{width:'50%',textAlign:'left',alignSelf:'center'}}>
                    <button style={{backgroundColor:"rgba(0, 0, 0, 0)",border:'none'}} onClick={logoutHandler}><PowerSettingsNewOutlinedIcon color='secondary' className={style.icone}/></button>              
                </Grid>
            </Grid>:
            <></>
            }
            <div className={style.top_menu}>
                <Grid container sx={{justifyContent:'space-around'}}>
                    <Grid item sm={6}>
                    <div className={style.s1}>
                        <div className={style.socials}>
                            {isLoading?
                            <>
                            <HeaderLoading/>
                            </>
                            :
                            <>
                            <a href={data.data[0].instagram} ><i className="fa fa-instagram"></i></a>
                            <a href={data.data[0].telegram}><i className="fa fa-telegram"></i></a>
                            <a href={data.data[0].email}><i className="fa fa-envelope"></i></a>
                            </>}  
                        </div>
                    </div>
                    </Grid>
                    <Grid item sm={6}>
                    <div className={style.s2}>
                        <div className={style.phone_number}>
                            <p> مشاوره رایگان تلفنی: </p>
                            {isLoading?
                            <>
                                <SkeletonTheme baseColor="#F3B40D" highlightColor="#444" width={50}>
                                <Skeleton width={100} height={20} className="socialSkeleton"/>
                                </SkeletonTheme>
                            </>
                            
                            :
                            <>
                            <a href={"tel:"+data.data[0].consultantNumber}>{data.data[0].consultantNumber}</a>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            </>
                            }
                            
                        </div>
                    </div>
                    </Grid>
                </Grid>
            </div>
            <Grid container className={style.logo}>
                <div className={style.logo}>
                
                <a href="#" className={style.logo}>
                    <img className={style.logo_img} src={'/img/logo.png'}/>
                </a>
                </div>
            </Grid>
            {isLoading?
            <>
            <div className={style.small_screen}>
                    <div className={style.socials}>
                        <HeaderLoading/>
                    </div>
                    <div className={style.s2}>
                        <div className={style.phone_number}>
                            <p> مشاورهdd رایگان تلفنی: </p>
                            <SkeletonTheme baseColor="#F3B40D" highlightColor="#444" width={50}>
                                <Skeleton width={100} height={20} className="socialSkeleton"/>
                            </SkeletonTheme>
                        </div>
                    </div> 
             </div>   
            

            </>:
            <>
            <div className={style.small_screen}>
                    <Grid item>
                        <div className={style.socials}>
                            <a href={data.data[0].instagram} ><i className="fa fa-instagram"></i></a>
                            <a href={data.data[0].telegram}><i className="fa fa-telegram"></i></a>
                            <a href={data.data[0].email}><i className="fa fa-envelope"></i></a>
                        </div>
                    </Grid>
                    <Grid item >
                        <div className={style.s2}>
                            <div className={style.phone_number}>
                                <p> مشاوره رایگان تلفنی: </p>
                                <a href={"tel:"+data.data[0].consultantNumber}>{data.data[0].consultantNumber}</a>
                                <i className="fa fa-phone" aria-hidden="true"></i>
                            </div>
                        </div>
                    </Grid>
            </div>
            </>}
            

        </div>
    );
}

export default Header;