import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';

export function proxy(request: NextRequest) {
  // get the token 
  const token=request.cookies.get("token");
  // If no token is found inside the browser cookies then return.
  if(!token){
    return NextResponse.redirect(new URL('/login',request.url));
  } 
  try{
    jwt.verify(token.value,process.env.JWT_SECRET!);
     // allowing to go to the api if token is there
    return NextResponse.next();
  }
  catch(error : any){
    return NextResponse.redirect(new URL('/login',request.url));
  }
}
 
export const config = {
  matcher: [
    '/',
    '/profile:path*',
    '/api/users/checkUser'
],
}