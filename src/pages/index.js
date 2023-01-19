import About from "@/components/about/about";
import axios from "axios";
import Head from "next/head";
export default function Home(props) {
  
  return (
    <header dir="rtl">
        <About history={props.history[0]}/>
    </header>
  )
}
export const getServerSideProps=async()=>{
  const response= await axios.get(
      "http://maahsin-test.click/MahsinApi/action/guest/findAllHistory.do?"
  )
 
  return{
      props:{
          history:response.data,
      }
      
  }
}
