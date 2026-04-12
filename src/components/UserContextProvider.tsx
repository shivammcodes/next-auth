"use client"
import { useRouter } from 'next/navigation';
import React, {createContext,useState,useEffect} from 'react';
import toast from 'react-hot-toast';

export const UserContext=createContext({});
type UserType={
  email :string,
  _id:  string,
}
const UserContextProvider = ({children} : {children: React.ReactNode}) => {
  const [userIsAuthenticated,setUserIsAuthenticated]=useState(false);
  const [user,setUser]=useState<UserType | null>(null); 
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  async function HandlerGetUser(){
    try{
      setLoading(true);
      const response = await fetch("/api/users/checkUser",{
        method : "GET",
        credentials: "include",
      })
      const data=await response.json();
      if(!response.ok){
        toast.error(data.error);
        router.push('/login');
        setUser(null);
        setUserIsAuthenticated(false);
      }
      else{
        setUser({email: data.user.email,_id: data.user._id});
        setUserIsAuthenticated(true); 
      }
      console.log("user data ",user);
    }
    catch(error){
      console.log("Something went wrong");
      setUser(null);
      setUserIsAuthenticated(false);
    } 
    finally {
    setLoading(false);
    }
  }
  useEffect(()=>{
    HandlerGetUser();
  },[])
  return (
    <UserContext.Provider value={{userIsAuthenticated,setUserIsAuthenticated,user,setUser,loading,setLoading}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider