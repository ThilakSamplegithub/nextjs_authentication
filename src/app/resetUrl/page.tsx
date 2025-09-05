"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ResetPassword = () => {
    const[token,setToken]=useState("")
    const[pass,setPass]=useState('')
    const[isUpdated,setUpdated]=useState(false)
    const[confirmPass,setConfirmPass]=useState("")
    const[isMatched,setMatched]=useState(false)
    function handlePassword(e:React.ChangeEvent<HTMLInputElement>){
        setPass(e.target.value)
    }
    function handleConfirmPass(e:React.ChangeEvent<HTMLInputElement>){
        setConfirmPass(e.target.value)
    }
    useEffect(()=>{
        if(confirmPass!==pass){
            setMatched(false)
        }else{
            setMatched(true)
        }
    },[confirmPass])
    useEffect(()=>{
        //token
        const tokenFromUrl=window.location.search.split('=')[1]
        setToken(tokenFromUrl)
    },[])
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
try {
    e.preventDefault()
   await axios.patch(`/api/users/resetpass`,{token,password:pass,confirmPassword:confirmPass})
    setUpdated(true)
} catch (error:any) {
    console.log(error.message)
}
    }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <div>Reset Password</div>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center  m-2 gap-2'>
        <input type="text" placeholder='Enter Password' className='border-1' value={pass} onChange={handlePassword}/>
        <input type="text" placeholder='Confirm Password' className='border-1' value={confirmPass} onChange={handleConfirmPass} />
        <p>{isMatched?"Matched":'Not yet matched'}</p>
        <button type='submit' className='border'>{isUpdated?"Password Updated":"Update Password"}</button>
        </form>
    </div>
  )
}

export default ResetPassword