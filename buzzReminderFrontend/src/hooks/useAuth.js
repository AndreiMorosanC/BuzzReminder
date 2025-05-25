import { useEffect, useState } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import {auth} from "../firebase"

export const useAuth = ()=>{
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async(firebaseUser)=>{
      if(firebaseUser){
        setUser(firebaseUser);
        const idToken = await getIdToken(firebaseUser);
        setToken(idToken);
      }else{
        setUser(null)
        setToken(null)
      }
      setLoading(false);
    })
    return ()=> unsubscribe();
  },[])

  return {user, token, loading}
}