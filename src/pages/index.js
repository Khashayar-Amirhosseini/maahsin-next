import About from "@/components/about/about";
import Servicees from "@/components/sevices/Services";
import { addAcheivements } from "@/redux/action/achievementAction";
import { addClusters } from "@/redux/action/clusterAction";
import { addDoctors } from "@/redux/action/doctorAction";
import { addGoals } from "@/redux/action/goalAction";
import { updateHistory } from "@/redux/action/HistoryAction";
import { addPictures } from "@/redux/action/pictureAction";
import { addPolicy } from "@/redux/action/policyAction";
import { addServices } from "@/redux/action/serviceAction";
import { store, wrapper } from "@/redux/store";
import axios from "axios";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
export default function Home(props) {
  const Address="http://maahsin-test.click/MahsinApi/";
  return (
    <header dir="rtl">
      <About Address={Address}/>
      <Servicees/>
    </header>
  )
}
export const getServerSideProps= wrapper.getServerSideProps((store)=> async()=>{
  const Address="http://maahsin-test.click/MahsinApi/"
  await axios.get(`${Address}/action/guest/findAllHistory.do?`).then((res)=>store.dispatch(updateHistory(res.data[0])))
  await axios.get(`${Address}/action/guest/findAllDoctors.do?`).then(res=>store.dispatch(addDoctors(res.data)))
  await axios.get(`${Address}/action/guest/findAllGoals.do?`).then(res=>store.dispatch(addGoals(res.data)))
  await axios.get(`${Address}/action/guest/findAllPolicies.do?`).then(res=>store.dispatch(addPolicy(res.data)))
  await axios.get(`${Address}/action/guest/findAllAchievement.do?`).then(res=>store.dispatch(addAcheivements(res.data)))
  await axios.get(`${Address}/action/guest/findAllMainServices.do?`).then(res=>store.dispatch(addClusters(res.data)))
})

