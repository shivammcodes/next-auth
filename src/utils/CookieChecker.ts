import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function CheckCookie(request : NextRequest){
    // getting the token object
        const token=request.cookies.get("token");
        
        // if no token is there then we redirect
        if(!token){
            throw new Error("No token found")
        }

        // if token then get the value that is the actual token
        const {value}=token;
    try{
        const payload=jwt.verify(value,process.env.JWT_SECRET!);
        return payload;
    }
    catch(error: any){
        throw new Error("Invalid token");
    }
}