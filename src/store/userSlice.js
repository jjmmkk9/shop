import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name: 'user',
    initialState: {name: 'cho', age: 20},

    reducers:{
        //array/object일 경우 직접수정해도 state 변경됨
        changeName(state){
            state.name = 'park'
        },
        increase(state, action){
            state.age += action.payload
        },
    },
})
export let {changeName, increase} = user.actions
export default user