"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import toast from 'react-hot-toast';
const page = () => {
    const router=useRouter();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[loading,setLoading]=useState(false);
    async function onSignup(e : any){
      e.preventDefault();
      try{
        setLoading(true);
        const response=await fetch("/api/users/signup",{
          method: "POST",
          headers:{"Content-Type" : "application/json"},
          body: JSON.stringify({email,password})
        })
        const data=await response.json();
        console.log(response);
        console.log(data);
        if(!response.ok){
          setLoading(false);
          for(let err of data.error){
            toast.error(err);
          }
        }
        else{
          setLoading(false);
          toast.success(data.msg);
          router.push('/login');
        }
      }
      catch(error){
        console.log(error);
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
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
      <form  onSubmit={onSignup}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="m@example.com"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" placeholder='****' type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-4">
        <Button type="submit" className="w-full" disabled={loading}>
          {
          loading ? "... Signing up" : "Signup"
          }
        </Button>
      </CardFooter> 
      </form>
    </Card>
    </div>
  )
}

export default page