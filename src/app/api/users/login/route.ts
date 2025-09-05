import {connect} from "@/dbConfig/dbConfig";
import {User} from "@/models/usermodel";
import { AnyARecord } from "dns";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest,NextResponse } from "next/server";
import { cookies } from 'next/headers'
connect()

export async function POST (request:NextRequest){
    try{
        const reqBody=await request.json()
        const {email,password}=reqBody
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({message:`No such user exists`,status:400})
        }
        const checkPassword= await bcrypt.compareSync(password, user.password)
        console.log(checkPassword,`is checking password`)
        if(!checkPassword){
            return NextResponse.json({message:`Password mismatch. Please check password`,status:400})
        }
        const userData={userId:user._id,userName:user.userName}
       const token=await jwt.sign({data:userData},process.env.TOKEN_SECRET)
       console.log(token)
        const cookieStore = await cookies()
        cookieStore.set('token',token)
        return NextResponse.json({message:`User Successfully logged in`,success:true,status:200})
        
    }catch(err:any){
        console.log(err.message)
        return NextResponse.json({error:`${err.message}`,message:`Something went wrong`,status:500})
    }
    
}