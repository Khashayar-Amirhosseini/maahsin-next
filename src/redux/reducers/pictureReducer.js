import { pictureActionType } from "../types";

const pictureInitialState={
    Pictures:[]
}
const PictureReducer = (state=pictureInitialState,action) => {
    switch (action){
        case pictureActionType.ADD_PICTURES:{
            return {...state,Pictures:[...state.Pictures].concat(action.pictures)}
        }
        case pictureActionType.REMOVE_PICTURES:{
            const newPictures=[...state.Pictures].filter(p=>p.id!==action.index)
            return{...state,Pictures:newPictures}
        }
        default:{return state}
    }
}
 
export default PictureReducer;