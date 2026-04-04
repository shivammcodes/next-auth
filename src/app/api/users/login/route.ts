import User from "@/model/user";
import { dbConnection } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

dbConnection();

export async function POST(request : NextRequest){
    try{
        const reqBody=await request.json();
        const{email,password}=reqBody;

        // finding that if the user exists or not
        const user=await User.findOne({email});

        // if user is not there return with error
        if(!user){
            return NextResponse.json({error:["User Does not exist"]},{status:400});
        }

        // compare the password
        const isPasswordValid=await bcrypt.compare(password,user.password);

        //if password does not match return with error
        if(!isPasswordValid){
            return NextResponse.json({error:["Invalid Password entered"]},{status:400});
        }
        
        //create the payoload data
        const payloadData={
            email: user.email,
            _id:user._id
        }

        //jwt creation
       const token= jwt.sign(payloadData,process.env.JWT_SECRET!,{expiresIn: "1d"});

       //creation of the response
       const response=NextResponse.json({msg:["User login successful"],success:true},{status:200});

    //    attatching the cookie to the response
       response.cookies.set("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
       })

       //returning the reponse
       return response;

    }
    catch(error :any){
        //status is 500 because of server error not clinet error, 400 is clinet error.
        return NextResponse.json({error:["Something went wrong"]},{status:500});
    }
}