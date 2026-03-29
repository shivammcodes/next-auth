"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios';


import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const page = () => {
    const router=useRouter();
    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    console.log(userName);
  return (
    <div className='bg-stone-900 h-screen w-full text-white flex items-center justify-center'>
         <Card className="w-full max-w-sm flex">
      <CardHeader>
        <CardTitle>Signup to your account</CardTitle>
        <CardDescription>
          Enter your email below to sign up to your account
        </CardDescription>
        <CardAction>
          <Link href={'/login'}>Login</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="email"
                value={userName}
                placeholder="m@example.com"
                required
                onChange={(e)=>setUserName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" placeholder='****' type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Signup
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default page