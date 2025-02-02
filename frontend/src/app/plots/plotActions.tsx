/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";

export default function PlotActions({ plot, onView, onEdit, onDelete }: any) {
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => onView(plot)}>
        <Eye />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onEdit(plot)}>
        <Pencil />
      </Button>
      <Button variant="destructive" size="icon" onClick={() => onDelete(plot.id)}>
        <Trash />
      </Button>
    </>
  );
}
