'use client'
import { getUserDetailsMethod } from '@/helpers/getUserDetails'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{useEffect, useState} from 'react'

const ProfilePage = () => {
  const router=useRouter()
  const[data,setData]=useState('nothing')
    async function onLogout():Promise<void>{
      try {
        await axios.get('/api/users/logout')
        router.push('/login')
      } catch (error:any) {
        console.log(error.message)
      }
      
    }
    async function  getUserDetails() {
      try {
        const user=await axios.get('/api/users/me')
        console.log(user.data.user._id,'is the id of user')
        setData(user.data.user._id)
      } catch (error:any) {
        console.log(error.message,'is error')
      }
    }
useEffect(()=>{
  getUserDetails()
},[])

  return (
    <div>
        <div className='flex justify-end border'>
            <button className='mr-3' onClick={onLogout}>Logout</button>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen">
       {data==='nothing' ? 'Nothing yet':<Link className='bg-amber-700' href={`/profile/${data}`}>{data}</Link>}
      <h1 className="text-center text-2xl ">Profile Page</h1>
      </div>
      <hr />
    </div>
  )
}

export default ProfilePage