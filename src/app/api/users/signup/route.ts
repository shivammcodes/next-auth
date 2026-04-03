import {dbConnection} from '@/dbConfig/dbConfig';
import User from '@/model/user';
import { NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

dbConnection();

export async function POST(request: NextRequest){
    try{
        const reqBody=await request.json();
        const{email,password}=reqBody;
        if(!email || ! password){
            return NextResponse.json({error: ["Both the email and passord are required"]},{status: 406});
        }
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        const userDoc=await User.create({
            email,
            password: hashedPassword
        })
        return NextResponse.json({msg: "User successfully created",data:userDoc,success: true},{status:201});
    }
    catch(error: any){
        console.log(error);
        let err=[];
        if(error.name=="ValidationError"){
            for(let key in error.errors){
                err.push(error.errors[key].message);
            }
            return NextResponse.json({error:err},{status: 400});
        }
        else if(error.code==11000){
            err.push("User already Exists");
            return NextResponse.json({error:err},{status:400});
        }
        else{
            err.push("Something went wrong");
            return NextResponse.json({error:err},{status:500});
        }
    }
}