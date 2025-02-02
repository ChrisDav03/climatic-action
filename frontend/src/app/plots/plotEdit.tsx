/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePlot, createPlot } from "@/app/plots/plots.api";
import { useAuth } from "@/context/AuthContext";

export default function PlotFormDialog({ plot, isOpen, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    size: "",
    cropType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (plot) {
      setFormData({
        latitude: plot.latitude || "",
        longitude: plot.longitude || "",
        size: plot.size || "",
        cropType: plot.cropType || "",
      });
    } else {
      setFormData({
        latitude: "",
        longitude: "",
        size: "",
        cropType: "",
      });
    }
  }, [plot]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (
      !formData.latitude ||
      !formData.longitude ||
      !formData.size ||
      !formData.cropType
    ) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        size: parseInt(formData.size),
        cropType: formData.cropType,
        userId: user?.id,
      };

      if (plot) {
       
        console.log("Updating plot with data:",plot.id, payload);
        await updatePlot(plot.id, payload);
      } else {
        
        console.log("Creating plot with data:", payload);
        await createPlot(payload);
      }
      onSave(); 
      onClose(); 
    } catch (error: any) {
      console.error("Failed to save plot:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Ocurrió un error al guardar la parcela. Intenta nuevamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{plot ? "Editar Parcela" : "Crear Parcela"}</DialogTitle>
        </DialogHeader>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <Label htmlFor="latitude">Latitud</Label>
            <Input
              id="latitude"
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="Ingresa la latitud"
            />
          </div>
          <div>
            <Label htmlFor="longitude">Longitud</Label>
            <Input
              id="longitude"
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="Ingresa la longitud"
            />
          </div>
          <div>
            <Label htmlFor="size">Tamaño (Metros cuadrados)</Label>
            <Input
              id="size"
              name="size"
              type="number"
              value={formData.size}
              onChange={handleInputChange}
              placeholder="Ingresa el tamaño"
            />
          </div>
          <div>
            <Label htmlFor="cropType">Tipo de Cultivo</Label>
            <Input
              id="cropType"
              name="cropType"
              type="text"
              value={formData.cropType}
              onChange={handleInputChange}
              placeholder="Ingresa el tipo de cultivo"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading
              ? "Guardando..."
              : plot
              ? "Actualizar Parcela"
              : "Crear Parcela"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
