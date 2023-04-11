import { pictureActionType } from "../types";

const pictureInitialState={
    Pictures:[]
}
const uniqueState=(obj)=>{
    return obj = obj.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === obj.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });
  }
const PictureReducer = (state=pictureInitialState,action) => {
    switch (action.type){ 
        case pictureActionType.ADD_PICTURES:{  
            return {...state,Pictures:uniqueState([...state.Pictures].concat(action.pictures))}
        }
        case pictureActionType.REMOVE_PICTURES:{
            const newPictures=[...state.Pictures].filter(p=>p.id!==action.index)
            return{...state,Pictures:newPictures}
        }
        default:{return state}
    }
}
 
export default PictureReducer;