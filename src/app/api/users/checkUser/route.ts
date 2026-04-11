import { NextRequest,NextResponse } from "next/server";
import { CheckCookie } from "@/utils/CookieChecker";
import User from "@/model/user";

type JwtPayload={
    email: string,
    _id: string
}
export async function GET(request: NextRequest){
    const userData=await CheckCookie(request) as JwtPayload;
    const{email}=userData;
    try{
        const user=await User.findOne({email});
        return NextResponse.json({user:{email,_id:user._id}},{status: 200});
    }
    catch(error: any){
        return NextResponse.json({error: ["Failed to load the user Data"]});
    }
}