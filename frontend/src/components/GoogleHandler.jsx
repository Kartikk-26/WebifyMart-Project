import React, { useEffect } from 'react'
import {useNavigate , useLocation} from 'react-router-dom'
function GoogleHandler() {
    const navigate = useNavigate() ;
const location = useLocation() ;

useEffect(()=>{
    console.log(location.search)
const params = new URLSearchParams(location.search)
console.log(params)
const token = params.get('token')
const role = params.get('role')
const id = params.get('id')
if(token && role){
    localStorage.setItem("token",token)
    localStorage.setItem('role',role)
    localStorage.setItem('id',id)
    navigate('/')
}
},[navigate ,location.search])
  return (
    <div>
     laoding 
    </div>
  )
}

export default GoogleHandler
