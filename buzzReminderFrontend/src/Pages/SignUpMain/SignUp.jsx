import React, { useState } from "react";
import { userRegister } from "../../hooks/userRegister";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const {
    email,
    password,
    name,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    register,
    error,
  } = userRegister();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm({ name, email, password }) {
    const errors = [];

    if (!name.trim() || name.length < 2) {
      errors.push("🧍 El nombre debe tener al menos 2 caracteres.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("📧 El correo electrónico no es válido.");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push(
        "🔒 La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."
      );
    }

    return errors;
  }

  const handleRegister = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const errors = validateForm({ name, email, password });

    if (errors.length > 0) {
      alert("❌ Errores en el formulario:\n\n" + errors.join("\n"));
      setIsSubmitting(false);
      return;
    }

    const result = await register();

    if (result?.token) {
      console.log("TOKEN ENVIADO:", result.token);

      const res = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${result.token}`, // ✅ con B mayúscula
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setIsSubmitting(false);
      navigate("/");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Register</h2>
      <div className="flex flex-row">
        <input
          type="text"
          required
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          required
          placeholder="Your Email"
          value={email}
          onChange={handleEmailChange}
          maxLength={254}
        />
      </div>
      <input
        type="password"
        required
        placeholder="Your Password"
        value={password}
        onChange={handlePasswordChange}
        autoComplete="new-password"
        minLength={8}
        maxLength={64}
      />
      <button type="button" onClick={handleRegister} disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Register"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignUp;
