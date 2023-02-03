import About from "@/components/about/about";
import { addDoctors } from "@/redux/action/doctorAction";
import { updateHistory } from "@/redux/action/HistoryAction";
import { store, wrapper } from "@/redux/store";
import axios from "axios";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
export default function Home(props) {

  return (
    <header dir="rtl">
    <About/>
    </header>
  )
}
export const getServerSideProps= wrapper.getServerSideProps((store)=> async()=>{
  const Address="http://maahsin-test.click/MahsinApi/"
  await axios.get(`${Address}/action/guest/findAllHistory.do?`).then((res)=>store.dispatch(updateHistory(res.data[0])))
  await axios.get(`${Address}/action/guest/findAllDoctors.do?`).then(res=>store.dispatch(addDoctors(res.data)))
})

