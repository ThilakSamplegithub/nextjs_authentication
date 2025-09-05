import {connect} from '@/dbConfig/dbConfig'
import {User} from "@/models/usermodel"
import { NextRequest,NextResponse } from 'next/server'
import { cookies } from 'next/headers'


connect()
export async function GET (){
    try {
      const cookieStore = await cookies()
      cookieStore.set('token','',{httpOnly:true,expires:new Date(0)})
        return NextResponse.json({message:'Logged-out successfully',status:200,success:true})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:'Something went wrong',status:500})
    }
}