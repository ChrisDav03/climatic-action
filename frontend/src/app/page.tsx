"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Link } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  const { user} = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    if (!user) {
      router.push("/login"); // Redirige si no hay token
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <div className="flex justify-between">
      <h1 className="text-4xl font-bold">Gestión de Parcelas</h1>
      <Link href="/plots/new" className={buttonVariants()} >
      Crear Parcela
      </Link>
      </div>
      
    </div>
  );
}
