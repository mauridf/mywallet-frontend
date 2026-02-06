import { useAuthStore } from "../../modules/auth/store";

export function Navbar() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="h-14 bg-white border-b flex items-center justify-end px-4">
      <button onClick={logout} className="text-sm">
        Sair
      </button>
    </div>
  );
}
