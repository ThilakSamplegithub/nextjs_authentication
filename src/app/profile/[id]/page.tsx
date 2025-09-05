
import React from 'react'

const ProfilePageDetails = async({params}: {
  params: Promise<{ id: string }>
}) => {
  const {id}=await params
 
  return (
    <div className='flex  justify-center items-center min-h-screen text-2xl'>
       {id}</div>
  )
}

export default ProfilePageDetails