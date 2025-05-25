import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";



export function useFirebaseAuth(){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const register = async ()=>{
        setLoading(true);
        setError(null)
        try{
            const userCred = await createUserWithEmailAndPassword(auth, email, password)
            return userCred.user
        }catch(err){
            setError(err.message)

        }finally{
            setLoading(false)
        }


    }

    const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken(); // Para enviar al backend
      return { user: userCred.user, token };
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

   return {
    email,
    password,
    setEmail,
    setPassword,
    handleEmailChange: (e) => setEmail(e.target.value),
    handlePasswordChange: (e) => setPassword(e.target.value),
    login,
    register,
    loading,
    error
  };





}