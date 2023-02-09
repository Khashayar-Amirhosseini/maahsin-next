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
import { Provider, useDispatch, useSelector } from "react-redux";
import { userLoggin, userLogout } from '@/redux/action/userAction'
import { Logout } from '@mui/icons-material'



const clientSideEmotionCache = createEmotionCache();

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage!='undefined'){
    const loggedUser=localStorage.getItem("user")
    if(loggedUser){
      dispatch(userLoggin(JSON.parse(loggedUser)))
    }}
  })
  const logout=()=>{
    localStorage.removeItem("user");
    dispatch(userLogout());
  }
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
            <Header logout={logout}/>
            <NavBar logout={logout}/>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </div>
  </>
  )
}
export default wrapper.withRedux(App);
