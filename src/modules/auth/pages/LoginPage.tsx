import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { useAuthStore } from "../store";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await AuthService.login({ email, password });

      setAuth(res.token, res.expiresAt);
      navigate("/");
    } catch (err: any) {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">MyWallet</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-full border p-2 mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-black text-white p-2"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <div className="text-sm mt-3 text-center">
        <a href="/register">Criar conta</a>
      </div>
    </div>
  );
}
