'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VerifyPage = () => {
    const [token,setToken]=useState('')
    const[isVerify,setVerify]=useState(false)
    useEffect(()=>{
        const urlToken=window.location.search.split("=")[1]
        setToken(urlToken)
    },[])
    const verifyemail=async(token:string)=>{
        try {
           await axios.patch(`/api/users/verifyemail`,{token}) 
            setVerify(true)
        } catch (error:any) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        verifyemail(token)
    },[token])
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-2xl">
        <div>{isVerify?"Verified User":"Not yet Verified"}</div>
        <div>Verify Page</div>
    </div>
  )
}

export default VerifyPage