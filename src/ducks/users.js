const intialState = {
    username:'',
    id:'',
    img:''
}
//TYPES
const UPDATE_USER = 'UPDATE_USER';
const GET_USER = "GET_USER"

export const updateUser = (user,id,img)=>{
    return{
        type:UPDATE_USER,
        payload:{
            username:user,
            id:id,
            img:img
        }
    }
}


export default function reducer(state = intialState, action){
    switch(action.type){
        case UPDATE_USER:
        return{...state,username:action.payload.username,id:action.payload.id,img:action.payload.img};

        default: return state;
    }
}