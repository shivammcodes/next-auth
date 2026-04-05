import { NextResponse } from "next/server";

export async function POST(){
    try{
        const response=NextResponse.json({msg:"User successfully logged out"},{status:200});
        response.cookies.set("token","",{
             httpOnly: true,
            //  this deletes the cookie instantly
             expires: new Date(0),
        });
        // After removing the cookie we return the response 
        return response;
    }
    catch(error : any){
        return NextResponse.json({error: ["Failed to logout"]},{status:500});
    }
}