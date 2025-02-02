/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ActivityTable({ activities }: any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Insumos</TableHead>
          <TableHead>Duración (min)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.length > 0 ? (
          activities.map((activity: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
              <TableCell>{activity.type}</TableCell>
              <TableCell>{activity.inputs}</TableCell>
              <TableCell>{activity.duration}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No hay actividades registradas.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
