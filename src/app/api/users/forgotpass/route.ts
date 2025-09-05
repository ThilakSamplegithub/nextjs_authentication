import {connect} from '@/dbConfig/dbConfig'
import { User } from '@/models/usermodel'
import { sendMail } from '@/helpers/mailer'
import { NextRequest, NextResponse } from 'next/server'
connect()

export async function PATCH (request:NextRequest){
try {
    const reqBody= await request.json()
    const{email}=reqBody 
    const user= await User.findOne({email})
    console.log(user)
    if(!user){
return NextResponse.json({message:"No such user exists",status:400})
    }
    sendMail({ email, userId:user._id, emailType:"RESET" })
    return NextResponse.json({message:`Mail sent`,status:200,success:true})
} catch (error:any) {
    console.log(error.message)
    return NextResponse.json({error:`Something went wrong`,status:500})
}
}