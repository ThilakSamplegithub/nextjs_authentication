import { connect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import { User } from "@/models/usermodel";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, userName } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const registeredUser = await User.create({
      email,
      password: hashedPassword,
      userName,
    });
    console.log(registeredUser, "is registeredUser");
    const userForemail=await User.findOne({email})
    console.log(userForemail._id)
    const data={emailType:"VERIFY",userId:userForemail._id,email}
    await sendMail(data)
    return NextResponse.json({
      message: "User registered Successfully",
      data: registeredUser,
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      error: "Cant register user successfully",
      status: 500,
    });
  }
}
