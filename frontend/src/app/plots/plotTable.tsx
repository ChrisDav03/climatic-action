/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PlotActions from "./plotActions";

export default function PlotTable({ plots, onView, onEdit, onDelete }: any) {
  return (
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
        {plots.map((plot: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{plot.latitude}</TableCell>
            <TableCell>{plot.longitude}</TableCell>
            <TableCell>{plot.size}</TableCell>
            <TableCell>{plot.cropType}</TableCell>
            <TableCell>
              <PlotActions plot={plot} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
