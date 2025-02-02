/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MiniMap from "./plotMap";
import ActivityTable from "../activities/ActivityTable";

export default function PlotDetailsDialog({ plot, activities, isOpen, onClose }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles de la Parcela</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <MiniMap latitude={plot.latitude} longitude={plot.longitude} />
          <h3 className="mt-4 text-lg font-semibold">Actividades</h3>
          <ActivityTable activities={activities} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
