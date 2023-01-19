import axios from "axios";
import { useState } from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as yup from 'yup';
//import './about.css'


const History = (props) => {
   
    return (
      
                <>
                <div className="accordion-body">
                    {props.history}
                </div>
                </>

        
     )

}
 
export default History;