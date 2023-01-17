
import style from './header.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import HeaderLoading from './headerLoading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, NavLink } from 'next';
import useSWRInfinite from 'swr'
import { Col, Row } from 'react-bootstrap';
//import UserProfile from '../../containers/userProfile/userProfile';
//import { calculateNewValue } from '@testing-library/user-event/dist/utils';
const Header = (props) => {
    const Address=props.address;
    const user=props.user;
    const url=`${Address}/action/guest/findAllFooters.do?`;
    const{data,error,isLoading}=useSWRInfinite(url,axios);
    const isAuth=props.isAuth;
    const logoutHandler=()=>{
        props.logout();
    }  
    return (
        <header className={style.main} dir='rtl'>
            {isAuth?
            <Row>
            <div className={style.userProfile}>
                <Col>
                    <div style={{float:"right",width:"auto"}}><NavLink to="/userProfile"><i className="fa fa-user-circle-o" aria-hidden="true"></i></NavLink></div>
                    <p style={{float:"right",width:"auto"}}>سلام {user.userInf.name} عزیز </p>
                </Col>
                <Col>
                    <div style={{textAlign:'left'}} >
                    <button style={{backgroundColor:"rgba(0, 0, 0, 0)",border:'none'}} onClick={logoutHandler}><i className="fa fa-power-off" aria-hidden="true"></i></button>
                    </div>                
                </Col>
                
            </div>
            </Row>:<></>
            }
            <div className={style.top_menu}>
                <Row>
                    <Col sm={4}>
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
                    </Col>
                    <Col sm={6}>
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
                    </Col>
                </Row>
            </div>
            <div className={[style.logo]}>
                <Row>
                <a href="#" className={[style.logo]}>
                    <img className={style.logo_img} src={'/img/logo.png'}/>
                </a>
                </Row>
            </div>
            {isLoading?
            <>
            <div className={style.small_screen}>
                
                    <Row>
                        <div className={style.socials}>
                            <HeaderLoading/>
                        </div>
                    </Row>
                    <Row>
                    <div className={[style.s2]}>
                        <div className={style.phone_number}>
                            <p> مشاوره رایگان تلفنی: </p>
                            <SkeletonTheme baseColor="#F3B40D" highlightColor="#444" width={50}>
                                <Skeleton width={100} height={20} className="socialSkeleton"/>
                            </SkeletonTheme>
                        </div>
                    </div>
                    </Row>
                
             </div>   
            

            </>:
            <>
            <div className={style.small_screen}>
                    <Row>
                        <div className={style.socials}>
                            <a href={data.data[0].instagram} ><i className="fa fa-instagram"></i></a>
                            <a href={data.data[0].telegram}><i className="fa fa-telegram"></i></a>
                            <a href={data.data[0].email}><i className="fa fa-envelope"></i></a>
                        </div>
                    </Row>
                    <Row >
                        <div className={style.s2}>
                            <div className={style.phone_number}>
                                <p> مشاوره رایگان تلفنی: </p>
                                <a href={"tel:"+data.data[0].consultantNumber}>{data.data[0].consultantNumber}</a>
                                <i className="fa fa-phone" aria-hidden="true"></i>
                            </div>
                        </div>
                    </Row>
            </div>
            </>}
            

        </header>
    );
}

export default Header;