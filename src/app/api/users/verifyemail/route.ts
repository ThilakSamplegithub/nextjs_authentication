import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function PATCH(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      $and: [
        { verifyToken: token },
        { verifyTokenExpiry: { $gt: Date.now() } },
      ],
    });
    if (!user) {
      return NextResponse.json({ message: `No such user exists`, status: 400 });
    }

    await User.updateOne(
      { _id: user._id },
      { $set: { isVerified: true, verifyToken: null, verifyTokenExpiry: null } }
    );

    return NextResponse.json({
      message: "Successfully verified",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      error: "Cant verify something went wrong",
      err: error.message,
      status: 500,
    });
  }
}
