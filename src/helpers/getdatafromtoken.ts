import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'
export async function getDataFromToken() {
    try {
         const cookieStore = await cookies()
  const token = cookieStore.get('token')
  console.log(token,'is the token from cookies')
  const decodedToken= await jwt.verify(token?.value,process.env.TOKEN_SECRET)
  console.log(decodedToken,`is data from token`)
console.log(decodedToken.data?.userId)
return decodedToken?.data?.userId
    } catch (error:any) {
        console.log(error.message)
        
    }
}