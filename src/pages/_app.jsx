import Header from '@/components/header/header'
import '@/styles/globals.css'
import '../styles/fonts/font-awesome.min.css'
import '../assets/ihover/ihover.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import createEmotionCache from '../../config/createEmotionCache'
import { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, Dialog, ThemeProvider } from '@mui/material'
import theme from 'config/theme'
import NavBar from '@/components/navbar/navbar'
import { Html } from 'next/document'
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";


const clientSideEmotionCache = createEmotionCache();

function App(props) {
  const Address = "http://maahsin-test.click/MahsinApi"    ;
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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <div dir='rtl'>
      <CacheProvider value={emotionCache}>  
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Header address={Address}/>
            <NavBar/>
            <Component {...pageProps} address={Address} />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </div>
  </>
  )
}
export default wrapper.withRedux(App);
