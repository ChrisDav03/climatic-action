/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { getPlots, deletePlot, createPlot, updatePlot } from "./plots/plots.api";
import PlotTable from "./plots/plotTable";
import PlotDetailsDialog from "./plots/plotDetailsDialog";
import PlotEditDialog from "./plots/plotEdit"; // Reutilizado para creación y edición
import { getActivitiesByPlot } from "./activities/activities.api";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [plots, setPlots] = useState<any[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<any>(null); // `null` para creación
  const [activities, setActivities] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false); // Para detalles
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Para edición/creación

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchPlots();
      setLoading(false);
    }
  }, [user, router]);

  const fetchPlots = async () => {
    try {
      const data = await getPlots();
      setPlots(data);
    } catch (error) {
      console.error("Failed to fetch plots:", error);
    }
  };

  const fetchActivities = async (plotId: string) => {
    try {
      const data = await getActivitiesByPlot(plotId);
      console.log(data);
      setActivities(data.activity);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  const handleViewPlot = (plot: any) => {
    setSelectedPlot(plot);
    fetchActivities(plot.id);
    setDialogOpen(true);
  };

  const handleEditPlot = (plot: any) => {
    setSelectedPlot(plot); // Establece el plot para edición
    setEditDialogOpen(true);
  };

  const handleCreatePlot = () => {
    setSelectedPlot(null); // `null` indica modo de creación
    setEditDialogOpen(true);
  };

  const handleDeletePlot = async (plotId: string) => {
    try {
      await deletePlot(plotId);
      fetchPlots();
    } catch (error) {
      console.error("Failed to delete plot:", error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedPlot) {
        
        await updatePlot(selectedPlot.id, data);
      } else {
        
        await createPlot(data);
      }
      fetchPlots(); 
      setEditDialogOpen(false); 
    } catch (error) {
      console.error("Failed to save plot:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gestión de Parcelas</h1>
        <button
          onClick={handleCreatePlot}
          className="mt-4 bg-red-500 text-white px-4 py-2 inline-block"
        >
          Crear Parcela
        </button>
      </div>

      <div className="mt-4">
        <PlotTable
          plots={plots}
          onView={handleViewPlot}
          onEdit={handleEditPlot}
          onDelete={handleDeletePlot}
        />
      </div>

      {/* Diálogo para detalles de parcela */}
      {selectedPlot && (
        <PlotDetailsDialog
          plot={selectedPlot}
          activities={activities}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}

      {/* Diálogo para creación/edición de parcela */}
      <PlotEditDialog
        plot={selectedPlot} 
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSave} 
      />
    </div>
  );
}
