//signup 
import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk
 } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "sonner"
import {jwtDecode} from 'jwt-decode';

export const Register = createAsyncThunk('/user/register', async(data,{rejectWithValue})=>{
    try {
      const res =  await axios.post(`${import.meta.env.VITE_API_URL}/api/register`,data)
      console.log(res.data)
      return res.data
  }
     catch (error) {
        rejectWithValue(error)
    }

} )


export const userLogin = createAsyncThunk('/user/login', async(data,{rejectWithValue})=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`,data)
      console.log(res.data)
      return res.data
  }
     catch (error) {
        console.log(error)
        console.log(rejectWithValue(error))
     return   rejectWithValue(error)
    }

} )

const initialState = {
loading : false ,
error : null ,
token : null ,
name : null ,
role : null
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers :{
      logout : (state) => {
         state.token = null ,
         state.role = null ,
         state.name = null ,
         localStorage.removeItem("token")
         localStorage.removeItem("role")
         localStorage.removeItem("name")
         localStorage.removeItem('cart')
      }
    },
    extraReducers : (builder) => {
    builder.addCase(Register.pending, (state)=>{
    state.loading = true ;
    state.error = null ;
 }).addCase(Register.fulfilled , (state)=>{
    state.loading = false ;
    state.error = null
    toast.success('Account created Successfully')
 }).addCase(Register.rejected,(state,action)=>{
    state.loading = false ;
    state.error = action.payload
 }).addCase(userLogin.pending, (state)=>{
    state.loading = true
 }).addCase(userLogin.fulfilled,(state,action)=>{
    
    state.loading = false 
    const {token} = action.payload
    const {name,role,id} = jwtDecode(token)
    console.log(id)
    //update the initial state
    state.role = role ;
    state.token = token ;
    state.name = name;
    //save the token , role in localstorage
    localStorage.setItem("token",token)
    localStorage.setItem('role', role )
    localStorage.setItem('name', name )
    localStorage.setItem('id', id )
    toast.success("Login Successfull")
 }).addCase(userLogin.rejected ,(state,action)=>{
    console.log(action.payload)
    state.loading = false,
    state.error = action.payload.response.data.message
    toast.error(action.payload.response.data.message)
 })
    }
})

export const {logout}= userSlice.actions
export default userSlice.reducer

//async thunk => we can use this middleware to implement all the asynchronous logic in the redux like api calling and then handle the states of the api in the slice like pending , failed , or fulfilled

//NOTE using createAsyncThunk we can implement the api logic which returns a promise and handle the promise states(pending,fulfilled , failed) in userSlice.

//NOTE createAsyncThunk accpets a action type and a function in which we are going to call the api.