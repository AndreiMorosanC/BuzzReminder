import { Children, createContext, useContext, useEffect,useState } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser)=>{
        if(firebaseUser){
            const idToken = await getIdToken(firebaseUser)
            setUser(firebaseUser)
            setToken(idToken)
        }else{
            setToken(null)
            setUser(null)
        }
        setLoading(false)
    })
    return ()=>unsubscribe();
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);



