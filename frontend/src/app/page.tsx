"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { getPlots } from "./plots/plots.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [plots, setPlots] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect if the user is not authenticated
    } else {
      setLoading(false);

      // Fetch plots
      const fetchPlots = async () => {
        try {
          const data = await getPlots();
          setPlots(data); // Store plots in state
        } catch (error) {
          console.error("Failed to fetch plots:", error);
        }
      };

      fetchPlots();
    }
  }, [user, router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gestión de Parcelas</h1>
        <Link href="/plots/new" className="mt-4 bg-red-500 text-white px-4 py-2 inline-block">
          Crear Parcela
        </Link>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Lista de Parcelas</h2>
        {plots.length > 0 ? (
          <Table>
            <TableCaption>Lista de parcelas registradas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Latitud</TableHead>
                <TableHead>Longitud</TableHead>
                <TableHead>Tamaño (Metros cuadrados)</TableHead>
                <TableHead>Tipo de Cultivo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plots.map((plot, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{plot.latitude}</TableCell>
                  <TableCell>{plot.longitude}</TableCell>
                  <TableCell>{plot.size}</TableCell>
                  <TableCell>{plot.cropType}</TableCell>
                  <TableCell>
                  <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Ver Actividades</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Table>
            <TableCaption>Actividades de la parcela</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Insumos</TableHead>
                <TableHead>Duracion</TableHead>
              </TableRow>
              
            </TableHeader>
            <TableBody>
            {plots.map((plot, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{plot.latitude}</TableCell>
                  <TableCell>{plot.longitude}</TableCell>
                  <TableCell>{plot.size}</TableCell>
                  <TableCell>{plot.cropType}</TableCell>
                  </TableRow>
                  ))}
              </TableBody>
              
          </Table>
            
        </DialogContent>
      </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No hay parcelas registradas.</p>
        )}
      </div>
    </div>
  );
}
