import React from "react";
import { userRegister } from "../../hooks/userRegister";

const SignUp = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    register,
    error,
  } = userRegister();

  const handleRegister = async () => {
    const result = await register();

    if (result?.token) {
      console.log("TOKEN ENVIADO:", result.token);

      const res = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${result.token}`, // ✅ con B mayúscula
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Register</h2>
      <input
        type="text"
        required
        placeholder="Your Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        required
        placeholder="Your Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignUp;
