import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";

export function userRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await getIdToken(user);
      return { user, token };
    } catch (err) {
      setError("error al registrar" + err.message);
      return null;
    }
  };

  return {
    email,
    password,
    name,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    register,
    error,
  };
}
