/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export async function getHeaders() {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; "); // Manually formatting cookies

  return {
    "Content-Type": "application/json",
    Cookie: cookieString, // Correctly formatted cookies
  };
}
export async function getPlots() {
    try {
      const headers = await getHeaders();
      const res = await fetch("http://localhost:5000/plots", {
        method: "GET", 
        headers,
        credentials: "include",
      });
  
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log("Fetched Plots:", data);
      return data; 
    } catch (error) {
      console.error("Failed to fetch plots:", error);
      throw error; 
    }
  }
  
export async function createPlot(plotData: any) {
  try {
    const headers = await getHeaders();
    const res = await fetch("http://localhost:5000/plots", {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(plotData),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Plot Created:", data);
    return data;
  } catch (error) {
    console.error("Failed to create plot:", error);
    throw error;
  }
  
}

export async function updatePlot(plotId: string, plotData: any) {
    try {
      const headers = await getHeaders();
      const res = await fetch(`http://localhost:5000/plots/${plotId}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(plotData),
      });
  
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log("Plot Updated:", data);
      return data;
    } catch (error) {
      console.error("Failed to update plot:", error);
      throw error;
    }
  }
  
  
  export async function deletePlot(plotId: string) {
    try {
      const headers = await getHeaders();
      const res = await fetch(`http://localhost:5000/plots/${plotId}`, {
        method: "DELETE",
        headers,
        credentials: "include",
      });
  
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  
      console.log(`Plot with ID ${plotId} deleted successfully.`);
      return { message: "Plot deleted successfully" };
    } catch (error) {
      console.error("Failed to delete plot:", error);
      throw error;
    }
  }