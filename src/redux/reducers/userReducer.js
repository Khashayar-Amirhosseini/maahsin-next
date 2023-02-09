
import { userActionType } from "../types";

const userInitialState={
    User:{ userInf: { name: "مهمان", family: "", id: 0, phoneNumber: '', email: '', footer: false },
           token: "",
           isAuthenticated:false}
};
const UserReducer = (state=userInitialState,action) => {
    switch (action.type){
        case userActionType.LOG_IN:{
            return{...state,User:action.user}
        }
        case userActionType.LOG_OUT:{
            return{...state,User:userInitialState}
        }
        default:{
            return state
        }
    } 
}
 
export default UserReducer;
