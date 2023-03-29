//state들 보관하는 통

// import {configureStore} from '@reduxjs/toolkit';

// export default configureStore({
//     reducer:{

//     }
// })


import {configureStore, createSlice} from '@reduxjs/toolkit';
import user from './store/userSlice';



            //useState 역할
let cart = createSlice({
    name: 'cart',
    initialState: [
        {id: 0, name:'신발', count: 1},
        {id: 3, name:'sinbal', count:1},
    ],
    reducers:{
        plus(state, action){
            state.find(el => el.id === action.payload).count++
        },
        addItem(state, action){
            state.push(action.payload);
        },
        removeItem(state, action){
            state.splice(state.findIndex(el => el.id === action.payload),1);
        }
    }
})


export default configureStore({
    reducer:{
        user: user.reducer,
        cart: cart.reducer
    }
})

export let{plus, addItem, removeItem} = cart.actions
