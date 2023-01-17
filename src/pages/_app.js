import Header from '@/components/header/header'
import '@/styles/globals.css'
import '../styles/fonts/font-awesome.min.css'
import '../assets/ihover/ihover.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap'
import Head from 'next/head'
import { Html } from 'next/document'

export default function App({ Component, pageProps }) {
  const Address = "http://maahsin-test.click/MahsinApi"    
    const user = { userInf: { name: "مهمان", family: "", id: 0, phoneNumber: '', email: '', footer: false }, token: "" }
    const [isAuth, setIsAuth] = useState(false);
    const [athenticatedUser, setAthenticatedUser] = useState(user);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setIsAuth(true)
            setAthenticatedUser(foundUser);
        }
    }, [])
    const login = (loggedUser) => {
        setAthenticatedUser(loggedUser);
        setIsAuth(true)
    }
    const logout=()=>{
        setIsAuth(false);
        setAthenticatedUser(user);
        localStorage.removeItem("user")
    }
  return (
  <>

    
    <Head>
    <title>
          کلینیک ماه سین
        </title>
        <meta
          name="کلینیک ماه سین"
          dir='rtl'
        />
    </Head>
   
    <ThemeProvider dir='rtl'  breakpoints={[ 'lg', 'md', 'sm']} minBreakpoint="sm">
      <Header address={Address} user={athenticatedUser} isAuth={isAuth} logout={logout}/>
      <Component {...pageProps} />
    </ThemeProvider>
    
    
  </>
  )
}
