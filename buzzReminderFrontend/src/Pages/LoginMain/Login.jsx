import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await getIdToken(user);
      const res = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error en el servidor");
      }
      const data = await res.json();
      console.log("✅ Login correcto:", data);
    } catch (err) {
      console.error("❌ Error de login:", err);

      if (err.code === "auth/user-not-found") {
        setError("El correo no está registrado.");
      } else if (err.code === "auth/wrong-password") {
        setError("La contraseña es incorrecta.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Problema de conexión con Firebase.");
      } else {
        setError("Ocurrió un error al iniciar sesión.");
      }

      console.error("❌ Error de login:", err);
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Cargando..." : "Entrar"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}


export default login;
