import {combineReducers} from 'redux'



const defaultState = false;

const userInfo = (state = defaultState,action)=>{
    switch(action.type){
        case 'SET_USERINFO':return action.data;break;
        default:break;
    }
    return state
}
const userInfoDetail = (state = defaultState,action)=>{
    switch(action.type){
        case 'SET_USERINFO_DETAIL':return action.data;break;
        default:break;
    }
    return state
}
const tempData = (state = defaultState,action)=>{
    switch(action.type){
        case 'SET_TEMP_DATA':return action.data;break;
        default:break;
    }
    return state
}

export default combineReducers({
    userInfo,
    userInfoDetail,
    tempData
})

