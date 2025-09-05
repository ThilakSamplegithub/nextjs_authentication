import {connect} from '@/dbConfig/dbConfig'
import { sendMail } from '@/helpers/mailer'
import {User} from "@/models/usermodel"
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function PATCH (request:NextRequest){
try {
    const reqBody= await request.json()
    const{token,password,confirmPassword}=reqBody
    const user=await User.findOne({$and:[{forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}}]})
    if(!user){
        return NextResponse.json({message:`No such user exists`,status:400})
    }
    if(password===confirmPassword){
        console.log(user,'is user')
const updatedUser=await User.updateOne(
  { _id: user._id },
  { $set: { password, forgotPasswordToken: null, forgotPasswordTokenExpiry: null } }
);
console.log(updatedUser,'is updated user')
        return NextResponse.json({message:`Successfully password updated`,status:200,success:true})
    }
} catch (error:any) {
    console.log(error.message)
    return NextResponse.json({error:'Cant update password',err:error.message,status:500})
}
}