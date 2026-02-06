import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);

      await AuthService.register({ name, email, password });
      navigate("/login");
    } catch {
      setError("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Criar conta</h1>

      <input
        placeholder="Nome"
        className="w-full border p-2 mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
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
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-black text-white p-2"
      >
        {loading ? "Criando..." : "Cadastrar"}
      </button>
    </div>
  );
}
