import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-4">
      <h1 className="text-lg font-bold mb-6">MyWallet</h1>

      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:opacity-80">Dashboard</Link>
        <Link to="/accounts" className="hover:opacity-80">Contas</Link>
        <Link to="/transactions" className="hover:opacity-80">Transações</Link>
        <Link to="/closing" className="hover:opacity-80">Fechamento</Link>
      </nav>
    </div>
  );
}
