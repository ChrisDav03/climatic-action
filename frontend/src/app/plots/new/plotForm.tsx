"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { createPlot } from "../plots.api";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
interface PlotData {
  latitude: number;
  longitude: number;
  size: number;
  cropType: string;
  userId: string;
}
export function PlotForm({ plot }: { plot?: PlotData }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      latitude: plot?.latitude,
      longitude: plot?.longitude,
      size: plot?.size,
      cropType: plot?.cropType,
    },
  });
  const router = useRouter();
  const params = useParams<{ id: string }>();
  console.log(params);
  const onSubmit = handleSubmit(async (data) => {
    console.log({ ...data, userId: user?.id });
    try {
      setLoading(true);
      await createPlot({
        ...data,
        latitude: parseFloat(data.latitude as unknown as string), // Ensure number
        longitude: parseFloat(data.longitude as unknown as string), // Ensure number
        size: parseFloat(data.size as unknown as string), // Ensure number
        userId: user?.id,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error creating plot:", error);
    } finally {
      setLoading(false);
    }
  });
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Latitud</Label>
        <Input
          type="number"
          {...register("latitude", { required: "Latitud es requerida" })}
        />
        {errors.latitude && (
          <p className="text-red-500">{errors.latitude.message}</p>
        )}
      </div>

      <div>
        <Label>Longitud</Label>
        <Input
          type="number"
          {...register("longitude", { required: "Longitud es requerida" })}
        />
        {errors.longitude && (
          <p className="text-red-500">{errors.longitude.message}</p>
        )}
      </div>

      <div>
        <Label>Tamaño</Label>
        <Input
          type="number"
          {...register("size", { required: "Tamaño es requerido" })}
        />
        {errors.size && <p className="text-red-500">{errors.size.message}</p>}
      </div>

      <div>
        <Label>Tipo Cultivo</Label>
        <Input
          {...register("cropType", {
            required: "Tipo de cultivo es requerido",
          })}
        />
        {errors.cropType && (
          <p className="text-red-500">{errors.cropType.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading
          ? "Enviando..."
          : params.id
          ? "Actualizar Parcela"
          : "Crear Parcela"}
      </Button>
    </form>
  );
}
