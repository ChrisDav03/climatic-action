"use client"; 
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bienvenido {user?.email}</p>
      <Link href="/" className="mt-4 bg-red-500 text-white px-4 py-2 inline-block">
  Entrar
</Link>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2">
        Cerrar sesión
      </button>
    </div>
  );
}
