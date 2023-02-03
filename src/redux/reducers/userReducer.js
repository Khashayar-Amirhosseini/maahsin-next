import { userLoggin } from "../action/userAction";
import { userActionType } from "../types";

const userInitialState={
    user:{ userInf: { name: "مهمان", family: "", id: 0, phoneNumber: '', email: '', footer: false }, token: "" }
}
const UserReducer = (state=userInitialState,action) => {
    switch (action.type){
        case userActionType.LOG_IN:{
            return{...state,user:action.user}
        }
    }
}
 
export default UserReducer;
