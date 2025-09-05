import {connect} from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getdatafromtoken'
import {User} from "@/models/usermodel"
import { NextResponse } from 'next/server'

connect()

export async function GET(){
    try {
      const userId=await getDataFromToken() 
      const user = await User.findOne({_id:userId}).select('-password')
      return NextResponse.json({user,status:200,success:true})

    } catch (error:any) {
        return NextResponse.json({message:``})
    }
}


