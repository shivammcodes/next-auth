import React, {useEffect,useContext, ReactNode} from 'react'
import { UserContext } from './UserContextProvider'
import { useRouter } from 'next/navigation'
import { SpinnerDemo } from './Spinner'
type contextOfUser={
    loading: boolean,
    userIsAuthenticated: boolean
}
const AuthChecker = ({children} : {children :React.ReactNode}) => {
    const{loading,userIsAuthenticated}=useContext(UserContext) as contextOfUser;
    const router=useRouter();
    function loadUser(){
         console.log("loading status :",loading,"Auth status",userIsAuthenticated);
        if(!loading && !userIsAuthenticated) router.push('/login');
    }
    useEffect(()=>{
        loadUser();
    },[userIsAuthenticated,loading])
    if(loading){
        return <SpinnerDemo></SpinnerDemo>
    }
    return userIsAuthenticated &&(
        <>{children}</>
    )
}

export default AuthChecker